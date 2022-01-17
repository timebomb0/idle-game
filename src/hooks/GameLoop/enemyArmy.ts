import { Dispatch } from '@reduxjs/toolkit';
import data from '../../game_data';
import { actions } from '../../state';
import { Army, SoldierType } from '../../types';
import { getArmyValue, randNum } from '../../util';

// TODO: Add more creative enemy army types/mutators and display them. e.g. weak(lower atk and def),
//       higher atk lower def, higher def lower atk, vengeful (deals higher dmg as remaining offense/def gets lower), etc
export default function ({ soldiers, dispatch }: { soldiers: Army; dispatch: Dispatch }): void {
	const yourArmyValue = getArmyValue(soldiers);
	let enemyArmyValue = 0;
	const enemyArmy: Army | Record<string, never> = {};
	const targetEnemyArmyValue = randNum(0.75 * yourArmyValue, 1.2 * yourArmyValue);

	while (enemyArmyValue < targetEnemyArmyValue) {
		// get random soldier that doesn't put us over target enemy army value
		const affordedSoldierTypes = Object.keys(data.soldiers).filter(
			(soldierType) =>
				data.soldiers[(soldierType as unknown) as SoldierType].purchasePrice <=
				targetEnemyArmyValue - enemyArmyValue,
		);
		const randSoldierType: SoldierType = Math.floor(
			Math.random() * affordedSoldierTypes.length,
		);

		enemyArmyValue += data.soldiers[randSoldierType].purchasePrice;
		enemyArmy[randSoldierType] = enemyArmy[randSoldierType]
			? (enemyArmy[randSoldierType] as number) + 1
			: 1;
	}

	dispatch(actions.setEnemyArmy(enemyArmy));
}
