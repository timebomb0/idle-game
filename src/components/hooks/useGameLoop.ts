import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { LOOP_MS } from '../../constants';
import { actions, AppState } from '../../state';

export default (): void => {
	const dispatch = useDispatch();
	const incrementors = useSelector((state: AppState) => state.incrementors);

	useEffect(() => {
		const interval = window.setInterval(() => {
			let gain = 0;
			config.incrementors.map((incrementor) => {
				gain += incrementor.incrementAmount * incrementors[incrementor.id] || 0;
			});
			dispatch(actions.incrementCoins(gain));
		}, LOOP_MS);

		return () => {
			clearInterval(interval);
		};
	}, [dispatch, incrementors]);
};
