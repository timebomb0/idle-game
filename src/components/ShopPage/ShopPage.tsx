import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PURCHASE_PRICE } from '../../constants';
import Page from '../Layout/Page/Page';
import { actions, AppState } from '../../state';
import './ShopPage.scss';
import Texts from '../../texts';
import { Purchases } from '../../types';

const ShopPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, incrementors } = useSelector((state: AppState) => state);

	const purchase = (incrementor: Purchases) => {
		return () => {
			dispatch(actions.decrementCoins(PURCHASE_PRICE[incrementor]));
			dispatch(actions.addIncrementor({ amount: 1, type: incrementor }));
		};
	};

	// TODO Create component displaying current amount, name of item, and purchase price
	return (
		<Page className="ShopPage">
			{Object.values(Purchases).map((incrementor) => {
				return (
					<button
						key={incrementor}
						onClick={purchase(incrementor)}
						disabled={coins < PURCHASE_PRICE[incrementor]}
					>
						[{incrementors[incrementor]}] Purchase {Texts[incrementor].singular} for{' '}
						{PURCHASE_PRICE[incrementor]}
					</button>
				);
			})}
		</Page>
	);
};

export default ShopPage;
