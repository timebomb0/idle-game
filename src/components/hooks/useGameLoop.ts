import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOOP_MS, INCREMENT_VALS } from '../../constants';
import { actions, AppState } from '../../state';

export default (): void => {
	const dispatch = useDispatch();
	const workers = useSelector((state: AppState) => state.workers);

	useEffect(() => {
		const interval = window.setInterval(() => {
			dispatch(actions.incrementCoins(workers * INCREMENT_VALS.worker));
		}, LOOP_MS);

		return () => {
			clearInterval(interval);
		};
	}, [dispatch, workers]);
};
