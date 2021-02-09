import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Page from '../Layout/Page/Page';
import { actions, AppState } from '../../state';
import './IncrementorPage.scss';
import config from '../../config';

const IncrementorPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, incrementors } = useSelector((state: AppState) => state);

	const purchase = (incrementor: { id: string; purchasePrice: number }) => {
		return () => {
			dispatch(actions.decrementCoins(incrementor.purchasePrice));
			dispatch(actions.addIncrementor({ amount: 1, type: incrementor.id }));
		};
	};
	// TODO Create component displaying current amount, name of item, and purchase price
	return (
		<Page className="IncrementorPage">
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
		</Page>
	);
};

export default IncrementorPage;
