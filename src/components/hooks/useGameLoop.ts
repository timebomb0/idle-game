import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOOP_MS } from '../../constants';
import { actions, AppState } from '../../state';
import useInterval from './useInterval';
import { processCoins, processEnemyArmy, processWar } from './GameLoop';

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
		processCoins({ workers, dispatch });

		if (!war.isActive) {
			processEnemyArmy({ soldiers, dispatch, enemyArmyTick, setEnemyArmyTick });
		}

		if (war.isActive) {
			processWar({ war, dispatch });
		}
	};
};
