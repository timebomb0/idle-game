import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOOP_MS, INCREMENT_VALS } from '../../constants';
import { actions, AppState } from '../../state';
import { Purchases } from '../../types';

export default (): void => {
	const dispatch = useDispatch();
	const incrementors = useSelector((state: AppState) => state.incrementors);

	useEffect(() => {
		const interval = window.setInterval(() => {
			let gain = 0;
			Object.values(Purchases).map((incrementor) => {
				gain += INCREMENT_VALS[incrementor] * incrementors[incrementor] || 0;
			});
			dispatch(actions.incrementCoins(gain));
		}, LOOP_MS);

		return () => {
			clearInterval(interval);
		};
	}, [dispatch, incrementors]);
};
