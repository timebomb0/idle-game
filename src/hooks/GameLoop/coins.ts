import { Dispatch } from '@reduxjs/toolkit';
import data from '../../game_data';
import { actions } from '../../state';
import { WorkerMap, WorkerType } from '../../types';

export default function ({ workers, dispatch }: { workers: WorkerMap; dispatch: Dispatch }): void {
	if (workers[WorkerType.Peddler]) {
		const gain = workers[WorkerType.Peddler] * data.coins.peddlerIncrementAmount;
		dispatch(actions.incrementCoins(gain));
	}
}
