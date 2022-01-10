import React from 'react';
import { useDispatch } from 'react-redux';

import { Page } from '../Layout';
import { actions } from '../../state';
import { StatDisplay } from '../StatDisplay';
import { randNum } from '../../util';
import styles from './ExplorePage.module.scss';

const ExplorePage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const getCoin = () => {
		const gain = randNum(1, 5);
		dispatch(actions.incrementCoins(gain));
		dispatch(actions.appendMessage({ message: `You scavenged ${gain} coins` }));
	};

	return (
		<Page className="ExplorePage">
			<div className="main">
				<button className="increment-coins" onClick={getCoin}>
					Scavenge
				</button>
			</div>

			<div className="bottom">
				<StatDisplay stat="coins" />
			</div>
		</Page>
	);
};

export default ExplorePage;