import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOOP_MS } from '../constants';
import { actions, AppState } from '../state';
import useInterval from './useInterval';
import data from '../game_data';
import {
	processExplore,
	processAutobuy,
	processCoins,
	processEnemyArmy,
	processWar,
} from './GameLoop';
import { current } from '@reduxjs/toolkit';
import { ActivityType } from '../types';
import { abbreviateNumber } from 'js-abbreviation-number';

export default (): void => {
	const dispatch = useDispatch();
	const [loopInterval, setLoopInterval] = useState(0);
	const [enemyArmyTick, setEnemyArmyTick] = useState(1);
	const [exploreTick, setExploreTick] = useState(1);
	const [warTick, setWarTick] = useState(1);
	const [hasWarEnded, setHasWarEnded] = useState(false);
	const soldiers = useSelector((state: AppState) => state.army.soldiers);
	const workers = useSelector((state: AppState) => state.workers);
	const war = useSelector((state: AppState) => state.army.war);
	const autobuyers = useSelector((state: AppState) => state.autobuyPower.inUse);
	const coins = useSelector((state: AppState) => state.coins);
	const currentActivity = useSelector((state: AppState) => state.activity.currentActivity);
	const scavengeSpoils = useSelector((state: AppState) => state.spoils.scavenge);

	// Handle triggering tick every LOOP_MS seconds
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

	// Handle swapping away from current activity
	useEffect(() => {
		if (currentActivity !== ActivityType.War && war.isActive) {
			dispatch(actions.appendMessage('Your army has surrendered.'));
			dispatch(actions.stopWar());
		}
		if (currentActivity !== ActivityType.Scavenge && scavengeSpoils > 0) {
			dispatch(actions.incrementCoins(scavengeSpoils));
			dispatch(actions.clearScavengeSpoils());
			dispatch(
				actions.appendMessage(
					`Gathered ${abbreviateNumber(scavengeSpoils)} scavenged coins`,
				),
			);
		}
	}, [currentActivity]);

	// logic that triggers once per tick
	const doTick = function () {
		dispatch(actions.incrementTickCount());
		processCoins({ workers, dispatch });
		processAutobuy({ autobuyers, coins, dispatch });

		if (exploreTick >= data.explore.scavengeUpdateInterval) {
			processExplore({ currentActivity, dispatch });
			setExploreTick(1);
		} else {
			setExploreTick(exploreTick + 1);
		}

		if (!war.isActive) {
			if (enemyArmyTick >= data.war.enemyArmyUpdateInterval) {
				processEnemyArmy({ soldiers, dispatch });
				setEnemyArmyTick(1);
			} else {
				setEnemyArmyTick(enemyArmyTick + 1);
			}
		}

		if (war.isActive && warTick >= data.war.warUpdateInterval) {
			processWar({ war, dispatch, hasWarEnded, setHasWarEnded });
			setWarTick(1);
		} else {
			setWarTick(warTick + 1);
		}
	};
};
