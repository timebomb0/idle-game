import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page, MenuStrip } from '../Layout';
import { actions, AppState } from '../../state';
import './ArmyPage.scss';
import config from '../../config';
import { ProgressBar } from '../ProgressBar';

const ArmyPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, incrementors } = useSelector((state: AppState) => state);

	const purchase = (incrementor: { id: string; purchasePrice: number }) => {
		return () => {
			dispatch(actions.decrementCoins(incrementor.purchasePrice));
			dispatch(actions.addIncrementor({ amount: 1, type: incrementor.id }));
		};
	};

	const getCoin = () => {
		dispatch(actions.incrementCoins(1));
	};

	// TODO Create component displaying current amount, name of item, and purchase price
	return (
		<Page className="ArmyPage">
			<div className="main">
				<button className="increment-coins" onClick={getCoin}>
					Get Coin
				</button>
			</div>
			{config.incrementors.map((incrementor) => {
				return (
					<button
						key={incrementor.id}
						onClick={purchase(incrementor)}
						disabled={coins < incrementor.purchasePrice}
					>
						[{incrementors[incrementor.id]}] Purchase {incrementor.texts.singular} for{' '}
						{incrementor.purchasePrice}
					</button>
				);
			})}
			<div className="bottom">
				<MenuStrip />
			</div>
		</Page>
	);
};

export default ArmyPage;
