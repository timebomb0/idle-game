import { Dispatch } from '@reduxjs/toolkit';
import data from '../../game_data';
import { actions } from '../../state';
import { SoldierMap, SoldierType } from '../../types';
import { randNum } from '../../util';

export default function ({
	autobuyers,
	coins,
	dispatch,
}: {
	autobuyers: SoldierMap;
	coins: number;
	dispatch: Dispatch;
}): void {
	let totalPurchaseCost = 0;
	Object.keys(autobuyers).forEach((soldierKey) => {
		const soldierType = (soldierKey as unknown) as SoldierType;
		const purchasePrice = data.soldiers[soldierType].purchasePrice;
		// if can autobuy, 30% chance to autobuy per tick
		if (autobuyers[soldierType] > 0 && coins >= purchasePrice && randNum(1, 10) <= 3) {
			const maxPurchaseQuantity = Math.floor(coins / purchasePrice);
			const purchaseQuantity = Math.min(maxPurchaseQuantity, autobuyers[soldierType]);
			coins -= purchaseQuantity * purchasePrice;
			totalPurchaseCost += purchaseQuantity * purchasePrice;

			dispatch(actions.addSoldier({ amount: purchaseQuantity, type: soldierType }));
		}
	});
	dispatch(actions.decrementCoins(totalPurchaseCost));
}
