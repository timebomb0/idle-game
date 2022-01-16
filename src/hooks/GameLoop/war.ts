import { actions, WarState } from '../../state';
import { Dispatch } from '@reduxjs/toolkit';
import { flattenObj, randNum } from '../../util';
import { Army, SoldierType } from '../../types';
import data from '../../game_data';
import { ObjectFlags } from 'typescript';
import { SoldierData } from '../../game_data/soldiers';

// TODO: Improve dmg algorithm, need to have it scale so it can handle very high atk and defense
//       alternatively could implement new army health stat, may be easier algorithm-wise
//       Should also always have chance to do minimum 2 damage [when numbers get low enough dmg is always 1 right now]
//       ...May be best and most interesting to do a more complex battle logic
//       that pits every individual soldier in each army vs one-another with some simple AI
//       killing off soldiers during the war as they take eachother's lives
export default function ({ war, dispatch }: { war: WarState; dispatch: Dispatch }): void {
	const yourSoldiers = flattenSoldiers(war.yourRemainingArmy);
	const yourDamageReceived = getDamageReceived(war.yourRemainingArmy);
	const yourMaxDamageReceived = getMaxDamageReceived(war.yourRemainingArmy);
	const yourLivingSoldierTypes = getLivingSoldierTypes(war.yourRemainingArmy);
	const enemySoldiers = flattenSoldiers(war.enemyRemainingArmy);
	const enemyDamageReceived = getDamageReceived(war.enemyRemainingArmy);
	const enemyMaxDamageReceived = getMaxDamageReceived(war.enemyRemainingArmy);
	const enemyLivingSoldierTypes = getLivingSoldierTypes(war.enemyRemainingArmy);

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
				army: war.yourRemainingArmy,
				damageReceived: yourDamageReceived,
			}),
			enemyRemainingArmy: getUpdatedArmy({
				army: war.enemyRemainingArmy,
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
	// todo: take dmg received and lower soldier counts in war state

	// TODO: Copy above logic for enemy soldier to attack
	// for (let e = 0; e < enemySoldierCount * 0.1; e++) {}

	// TODO: After damage calculated for enemy and your army, deal damage by killing things [subtracting quantities alive]
	//       and updating health bar [e.g. if remaining attack didn't finish off a unit]

	// idea:
	// a random 10% of your soldiers attack a random 10% of enemy's soldiers
	// alternate 1 of your soldier to 1 of enemy soldier until all 10% have attacked
	// for health, have 1 health bar for each soldier type and just lower that health bar, when it hits 0 kill 1 of the soldiers

	// for reference use these actions:
	// dispatch(actions.updateRemainingArmy(updatedArmyStats));
	// 	dispatch(
	// 		actions.appendMessage({
	// 			message: `You have won the war and gained ${repGainAmount} reputation`,
	// 		}),
	// 	);
	// 	dispatch(actions.stopWar());
	// 	dispatch(actions.incrementReputation(repGainAmount));
	// 	// TODO: add won war logic/rewards
	// } else if (
	// 	dispatch(actions.appendMessage({ message: 'You have lost the war' }));
	// 	dispatch(actions.stopWar());
	// 	// TODO: add lost war logic/rewards
}

function processSoldierAttack({
	attackerSoldierType,
	defenderLivingSoldierTypes,
	defenderDamageReceived,
	defenderMaxDamageReceived,
}: {
	attackerSoldierType: SoldierType;
	defenderLivingSoldierTypes: SoldierType[];
	defenderDamageReceived: Record<SoldierType, number>;
	defenderMaxDamageReceived: Record<SoldierType, number>;
}) {
	// your soldier damages a random enemy soldier
	const randDefenderSoldierType =
		defenderLivingSoldierTypes[Math.floor(Math.random() * defenderLivingSoldierTypes.length)];
	const damageDealt = Math.max(
		0,
		data.soldiers[attackerSoldierType].offense *
			(100 / (100 + data.soldiers[randDefenderSoldierType].defense)),
	);
	defenderDamageReceived[randDefenderSoldierType] += damageDealt;
	if (
		defenderDamageReceived[randDefenderSoldierType] >=
		defenderMaxDamageReceived[randDefenderSoldierType]
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
	army: Army;
	damageReceived: Record<SoldierType, number>;
}): Army {
	const updatedArmy = { ...army };
	Object.entries(damageReceived).forEach(([soldierKey, damageAmount]) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		updatedArmy[soldierType] = Math.max(
			0,
			(updatedArmy[soldierType] || 0) -
				Math.floor(damageAmount / data.soldiers[soldierType].health),
		);
	});

	return updatedArmy;
}

function flattenSoldiers(army: Army): SoldierType[] {
	return Object.entries(army).reduce((soldiers, [soldierKey, soldierCount]) => {
		return soldierCount || 0 > 0
			? soldiers.concat(
					(Array(soldierCount) as SoldierType[]).fill(
						(soldierKey as unknown) as SoldierType,
					),
			  )
			: soldiers;
	}, [] as SoldierType[]);
}

function getDamageReceived(army: Army) {
	return Object.keys(army).reduce((newObj, soldierKey) => {
		newObj[(soldierKey as unknown) as SoldierType] = 0;
		return newObj;
	}, {} as Record<SoldierType, number>);
}

function getMaxDamageReceived(army: Army) {
	return Object.keys(army).reduce((newObj, soldierKey) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		const soldierQuantity: number = army[soldierType] || 0;
		newObj[soldierType] = data.soldiers[soldierType].health * soldierQuantity;
		return newObj;
	}, {} as Record<SoldierType, number>);
}

function getLivingSoldierTypes(army: Army) {
	return Object.keys(army).reduce((soldierTypes, soldierKey) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		if (army[soldierType] || 0 > 0) {
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
