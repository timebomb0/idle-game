import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../state';
import { Page } from '../Layout/Page';
import './MainPage.scss';
import { StatDisplay } from './StatDisplay';

const MainPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const getCoin = () => {
		dispatch(actions.incrementCoins(1));
	};

	return (
		<Page className="MainPage">
			<StatDisplay stat="coins" />
			<StatDisplay stat="coinsPerSecond" display="abbr" />
			<button className="increment-coins" onClick={getCoin}>
				Get Coin
			</button>
		</Page>
	);
};

export default MainPage;
