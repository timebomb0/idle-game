import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { LOOP_MS } from '../../constants';
import { actions, AppState } from '../../state';
import { WorkerType } from '../../types';
import { getArmyDefense, getArmyOffense, randNum } from '../../util';
import useInterval from './useInterval';

export default (): void => {
	const dispatch = useDispatch();
	const [loopInterval, setLoopInterval] = useState(0);
	const [enemyArmyTick, setEnemyArmyTick] = useState(0);
	const soldiers = useSelector((state: AppState) => state.army.soldiers);
	const workers = useSelector((state: AppState) => state.workers);
	const war = useSelector((state: AppState) => state.army.war);

	useInterval(() => {
		setLoopInterval(loopInterval + 1);
		if (loopInterval < 100) {
			dispatch(actions.setTick(loopInterval));
		}
		if (loopInterval >= 100) {
			setLoopInterval(0);
			dispatch(actions.setTick(loopInterval));
			doTick();
		}
	}, LOOP_MS / 100);

	const doTick = function () {
		doIncrementCoins();

		if (!war.isActive) {
			doRefreshEnemyArmy();
		}

		if (war.isActive) {
			doProcessWar();
		}
	};

	const doIncrementCoins = () => {
		if (workers[WorkerType.Grocer]) {
			const gain = workers[WorkerType.Grocer] * config.grocerIncrementAmount;
			dispatch(actions.incrementCoins(gain));
		}
	};

	const doRefreshEnemyArmy = () => {
		const armyOffense = getArmyOffense(soldiers) + 1;
		const armyDefense = getArmyDefense(soldiers) + 1;
		if (enemyArmyTick >= config.enemyArmyUpdateInterval) {
			dispatch(
				actions.setEnemyArmy({
					name: 'test',
					offense: randNum(armyOffense * 0.8, armyOffense * 1.2),
					defense: randNum(armyDefense * 0.8, armyDefense * 1.2),
				}),
			);
			setEnemyArmyTick(0);
		} else {
			setEnemyArmyTick(enemyArmyTick + 1);
		}
	};

	const doProcessWar = () => {
		// TODO: Improve dmg algorithm, need to have it scale so it can handle very high atk and defense
		//       alternatively could implement new army health stat, may be easier algorithm-wise
		let yourDamageDealt =
			(war.yourRemainingArmy.offense / 10) * (100 / (100 + war.enemyRemainingArmy.defense));
		let enemyDamageDealt =
			(war.enemyRemainingArmy.offense / 10) *
			(100 / (100 + war.yourRemainingArmy.defense ?? 10));
		yourDamageDealt = Math.max(
			1,
			Math.round(randNum(yourDamageDealt * 0.9, yourDamageDealt * 1.1)),
		);
		enemyDamageDealt = Math.max(
			1,
			Math.round(randNum(enemyDamageDealt * 0.9, enemyDamageDealt * 1.1)),
		);

		const updatedArmyStats = {
			yourRemainingArmy: {
				offense:
					war.yourRemainingArmy.defense > 0
						? war.yourRemainingArmy.offense
						: Math.max(0, war.yourRemainingArmy.offense - enemyDamageDealt),
				defense:
					war.yourRemainingArmy.defense > 0
						? Math.max(0, war.yourRemainingArmy.defense - enemyDamageDealt)
						: 0,
			},
			enemyRemainingArmy: {
				offense:
					war.enemyRemainingArmy.defense > 0
						? war.enemyRemainingArmy.offense
						: Math.max(0, war.enemyRemainingArmy.offense - yourDamageDealt),
				defense:
					war.enemyRemainingArmy.defense > 0
						? Math.max(0, war.enemyRemainingArmy.defense - yourDamageDealt)
						: 0,
			},
		};
		dispatch(actions.updateRemainingArmy(updatedArmyStats));
		if (
			updatedArmyStats.enemyRemainingArmy.defense === 0 &&
			updatedArmyStats.enemyRemainingArmy.offense === 0
		) {
			dispatch(actions.appendMessage({ message: 'You have won the war' }));
			dispatch(actions.stopWar());
			// TODO: add won war logic/rewards
		} else if (
			updatedArmyStats.yourRemainingArmy.defense === 0 &&
			updatedArmyStats.yourRemainingArmy.offense === 0
		) {
			dispatch(actions.appendMessage({ message: 'You have lost the war' }));
			dispatch(actions.stopWar());
			// TODO: add lost war logic/rewards
		}
		return;
	};
};
