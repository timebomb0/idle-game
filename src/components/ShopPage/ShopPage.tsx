import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PURCHASE_PRICE } from '../../constants';
import Page from '../Layout/Page/Page';
import { actions, AppState } from '../../state';
import './ShopPage.scss';

const ShopPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, workers } = useSelector((state: AppState) => state);

	const purchaseWorker = () => {
		dispatch(actions.decrementCoins(PURCHASE_PRICE.worker));
		dispatch(actions.incrementWorkers(1));
	};

	// TODO Create component displaying current amount, name of item, and purchase price
	// TODO move hardcoded texts to texts folder
	return (
		<Page className="ShopPage">
			<button onClick={purchaseWorker} disabled={coins < PURCHASE_PRICE.worker}>
				[{workers}] Purchase Worker for {PURCHASE_PRICE.worker}
			</button>
		</Page>
	);
};

export default ShopPage;
