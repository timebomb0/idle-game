import { Dispatch } from '@reduxjs/toolkit';
import config from '../../../config';
import { actions, WorkerState } from '../../../state';
import { WorkerType } from '../../../types';

export default function ({
	workers,
	dispatch,
}: {
	workers: WorkerState;
	dispatch: Dispatch;
}): void {
	if (workers[WorkerType.Peddler]) {
		const gain = workers[WorkerType.Peddler] * config.peddlerIncrementAmount;
		dispatch(actions.incrementCoins(gain));
	}
}
