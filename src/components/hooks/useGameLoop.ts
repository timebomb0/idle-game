import { nextTick } from 'process';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { LOOP_MS } from '../../constants';
import { actions, AppState } from '../../state';
import { WorkerType } from '../../types';
import { getArmyStrength, randNum } from '../../util';
import useInterval from './useInterval';

export default (): void => {
	const dispatch = useDispatch();
	const [loopInterval, setLoopInterval] = useState(0);
	const [enemyArmyTick, setEnemyArmyTick] = useState(0);
	const soldiers = useSelector((state: AppState) => state.soldiers);
	const workers = useSelector((state: AppState) => state.workers);

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
		const armyStrength = getArmyStrength(soldiers);
		if (workers[WorkerType.Grocer]) {
			const gain = workers[WorkerType.Grocer] * config.grocerIncrementAmount;
			dispatch(actions.incrementCoins(gain));
		}

		if (enemyArmyTick >= config.enemyArmyUpdateInterval) {
			dispatch(
				actions.setEnemyArmy({
					name: 'test',
					strength: randNum(armyStrength * 0.8, armyStrength * 1.2),
				}),
			);
			setEnemyArmyTick(0);
		} else {
			setEnemyArmyTick(enemyArmyTick + 1);
		}
	};
};
