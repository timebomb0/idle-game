import { actions, WarState } from '../../state';
import { Dispatch } from '@reduxjs/toolkit';
import { Army, SoldierType } from '../../types';
import { WarringArmy } from '../../state';
import data from '../../game_data';

// TODO: Verify dmg algorithm, make sure it can scale so it can handle very high atk and defense
// TODO: Reset enemy army after the war, create UI state so if no enemy army is set it displays something
export default function ({ war, dispatch }: { war: WarState; dispatch: Dispatch }): void {
	const yourSoldiers = flattenSoldiers(war.you.soldiers);
	const yourDamageReceived = getDamageReceived(war.you.soldiers);
	const yourMaxDamageReceived = getMaxDamageReceived(war.you.soldiers);
	const yourLivingSoldierTypes = getLivingSoldierTypes(war.you.soldiers);
	const enemySoldiers = flattenSoldiers(war.enemy.soldiers);
	const enemyDamageReceived = getDamageReceived(war.enemy.soldiers);
	const enemyMaxDamageReceived = getMaxDamageReceived(war.enemy.soldiers);
	const enemyLivingSoldierTypes = getLivingSoldierTypes(war.enemy.soldiers);

	yourSoldiers.forEach((yourSoldierType) => {
		if (enemyLivingSoldierTypes.length > 0)
			processSoldierAttack({
				attackerSoldierType: yourSoldierType,
				defenderLivingSoldierTypes: enemyLivingSoldierTypes,
				defenderDamageReceived: enemyDamageReceived,
				defenderMaxDamageReceived: enemyMaxDamageReceived,
			});
	});

	enemySoldiers.forEach((enemySoldierType) => {
		if (yourLivingSoldierTypes.length > 0)
			processSoldierAttack({
				attackerSoldierType: enemySoldierType,
				defenderLivingSoldierTypes: yourLivingSoldierTypes,
				defenderDamageReceived: yourDamageReceived,
				defenderMaxDamageReceived: yourMaxDamageReceived,
			});
	});

	dispatch(
		actions.updateRemainingArmy({
			yourRemainingArmy: getUpdatedArmy({
				army: war.you,
				damageReceived: yourDamageReceived,
			}),
			enemyRemainingArmy: getUpdatedArmy({
				army: war.enemy,
				damageReceived: enemyDamageReceived,
			}),
		}),
	);

	if (enemyLivingSoldierTypes.length === 0) {
		dispatch(
			actions.appendMessage({
				message: `You have won the war and gained 100 reputation`,
			}),
		);
		dispatch(actions.stopWar());
		dispatch(actions.incrementReputation(100));
		// TODO: add won war logic/rewards
	} else if (yourLivingSoldierTypes.length === 0) {
		dispatch(actions.appendMessage({ message: 'You have lost the war' }));
		dispatch(actions.stopWar());
	}
}

function processSoldierAttack({
	attackerSoldierType,
	defenderLivingSoldierTypes,
	defenderDamageReceived,
	defenderMaxDamageReceived,
}: {
	attackerSoldierType: SoldierType;
	defenderLivingSoldierTypes: SoldierType[];
	defenderDamageReceived: Army;
	defenderMaxDamageReceived: Army;
}) {
	// your soldier damages a random enemy soldier
	const randDefenderSoldierType =
		defenderLivingSoldierTypes[Math.floor(Math.random() * defenderLivingSoldierTypes.length)];
	const damageDealt = Math.max(
		0,
		data.soldiers[attackerSoldierType].offense *
			(100 / (100 + data.soldiers[randDefenderSoldierType].defense)),
	);
	defenderDamageReceived[randDefenderSoldierType] =
		defenderDamageReceived[randDefenderSoldierType] || 0 + damageDealt;
	if (
		Number(defenderDamageReceived[randDefenderSoldierType]) >=
		Number(defenderMaxDamageReceived[randDefenderSoldierType])
	)
		defenderLivingSoldierTypes.splice(
			defenderLivingSoldierTypes.indexOf(randDefenderSoldierType),
			1,
		);
}

function getUpdatedArmy({
	army,
	damageReceived,
}: {
	army: WarringArmy;
	damageReceived: Army;
}): WarringArmy {
	const updatedArmy = { ...army.soldiers };
	const updatedHealths = { ...army.soldierHealths };
	Object.entries(damageReceived).forEach(([soldierKey, damageAmount]) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		damageAmount = (damageAmount || 0) + (army.soldierHealths[soldierType] || 0);
		const soldierRemainingHealth = Math.round(damageAmount % data.soldiers[soldierType].health);

		updatedArmy[soldierType] = Math.max(
			0,
			(updatedArmy[soldierType] || 0) -
				Math.floor(damageAmount / data.soldiers[soldierType].health),
		);
		updatedHealths[soldierType] = soldierRemainingHealth;
	});

	return {
		soldiers: updatedArmy,
		soldierHealths: updatedHealths,
	};
}

function flattenSoldiers(soldiers: Army): SoldierType[] {
	return Object.entries(soldiers).reduce((soldiers, [soldierKey, soldierCount]) => {
		return soldierCount || 0 > 0
			? soldiers.concat(
					(Array(soldierCount) as SoldierType[]).fill(
						(soldierKey as unknown) as SoldierType,
					),
			  )
			: soldiers;
	}, [] as SoldierType[]);
}

function getDamageReceived(soldiers: Army): Army {
	return Object.keys(soldiers).reduce((newObj, soldierKey) => {
		newObj[(soldierKey as unknown) as SoldierType] = 0;
		return newObj;
	}, {} as Army);
}

function getMaxDamageReceived(soldiers: Army): Army {
	return Object.keys(soldiers).reduce((newObj, soldierKey) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		const soldierQuantity: number = soldiers[soldierType] || 0;
		newObj[soldierType] = data.soldiers[soldierType].health * soldierQuantity;
		return newObj;
	}, {} as Army);
}

function getLivingSoldierTypes(soldiers: Army): SoldierType[] {
	return Object.keys(soldiers).reduce((soldierTypes, soldierKey) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		if (soldiers[soldierType] || 0 > 0) {
			soldierTypes.push(soldierType);
		}
		return soldierTypes;
	}, [] as SoldierType[]);
}

/* No longer using this function, may use for future AI improvements
function armyToSoldierPercentage(army: Army, totalSoldierCount: number): Army {
	const result = { ...army };
	Object.keys(result).forEach((soldierType) => {
		const st = (soldierType as unknown) as SoldierType;
		result[st] = (result[st] || 0) / totalSoldierCount;
	});
	return result;
}
*/
