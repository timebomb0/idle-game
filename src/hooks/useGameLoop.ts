import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOOP_MS } from '../constants';
import { actions, AppState } from '../state';
import useInterval from './useInterval';
import data from '../game_data';
import { processAutobuy, processCoins, processEnemyArmy, processWar } from './GameLoop';

export default (): void => {
	const dispatch = useDispatch();
	const [loopInterval, setLoopInterval] = useState(0);
	const [enemyArmyTick, setEnemyArmyTick] = useState(0);
	const [warTick, setWarTick] = useState(0);
	const soldiers = useSelector((state: AppState) => state.army.soldiers);
	const workers = useSelector((state: AppState) => state.workers);
	const war = useSelector((state: AppState) => state.army.war);
	const autobuyers = useSelector((state: AppState) => state.autobuyPower.inUse);
	const coins = useSelector((state: AppState) => state.coins);

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
		processAutobuy({ autobuyers, coins, dispatch });

		if (!war.isActive) {
			if (enemyArmyTick >= data.war.enemyArmyUpdateInterval) {
				processEnemyArmy({ soldiers, dispatch });
				setEnemyArmyTick(0);
			} else {
				setEnemyArmyTick(enemyArmyTick + 1);
			}
		}

		if (war.isActive && warTick >= data.war.warUpdateInterval) {
			processWar({ war, dispatch });
			setWarTick(0);
		} else {
			setWarTick(warTick + 1);
		}
	};
};
