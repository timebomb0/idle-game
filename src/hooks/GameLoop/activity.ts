import { Dispatch } from '@reduxjs/toolkit';
import { actions } from '../../state';
import { ActivityType } from '../../types';
import { randNum } from '../../util';

export default function ({
	currentActivity,
	dispatch,
}: {
	currentActivity: ActivityType;
	dispatch: Dispatch;
}): void {
	if (currentActivity === ActivityType.Scavenge) {
		const gain = randNum(100, 500);
		dispatch(actions.incrementCoins(gain));
	}
}
