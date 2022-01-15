import { Dispatch } from '@reduxjs/toolkit';
import config from '../../../config';
import { actions, SoldierState } from '../../../state';
import { getArmyDefense, getArmyOffense, randNum } from '../../../util';

// TODO: Add more creative enemy army types/mutators and display them. e.g. weak(lower atk and def),
//       higher atk lower def, higher def lower atk, vengeful (deals higher dmg as remaining offense/def gets lower), etc
export default function ({
	soldiers,
	dispatch,
	enemyArmyTick,
	setEnemyArmyTick,
}: {
	soldiers: SoldierState;
	dispatch: Dispatch;
	enemyArmyTick: number;
	setEnemyArmyTick: (n: number) => void;
}): void {
	const armyOffense = getArmyOffense(soldiers) + 1;
	const armyDefense = getArmyDefense(soldiers) + 1;
	if (enemyArmyTick >= config.enemyArmyUpdateInterval) {
		dispatch(
			actions.setEnemyArmy({
				name: 'test',
				offense: randNum(armyOffense * 0.6, armyOffense * 1.25),
				defense: randNum(armyDefense * 0.6, armyDefense * 1.25),
			}),
		);
		setEnemyArmyTick(0);
	} else {
		setEnemyArmyTick(enemyArmyTick + 1);
	}
}
