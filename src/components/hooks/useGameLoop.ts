import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import { LOOP_MS } from '../../constants';
import { actions, AppState } from '../../state';
import useInterval from './useInterval';

export default (): void => {
	const dispatch = useDispatch();
	const soldiers = useSelector((state: AppState) => state.soldiers);

	useInterval(() => {
		// let gain = 0;
		// config.soldiers.map((soldier) => {
		// 	gain += soldier.incrementAmount * soldiers[soldier.id] || 0;
		// });
		// dispatch(actions.incrementCoins(gain));
	}, LOOP_MS);
};
