import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import config from '../../config';
import styles from './ArmyPage.module.scss';
import { SoldierType } from '../../types';
import { GameTooltip } from '../GameTooltip';

const ArmyPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const coins = useSelector((state: AppState) => state.coins);
	const { soldiers } = useSelector((state: AppState) => state.army);

	const purchase = (soldier: { id: SoldierType; purchasePrice: number }) => {
		return () => {
			const soldierConfig = config.soldiers.find(
				(soldierConfig) => soldierConfig.id === soldier.id,
			);
			dispatch(actions.decrementCoins(soldier.purchasePrice));
			dispatch(actions.addSoldier({ amount: 1, type: soldier.id }));
			dispatch(
				actions.appendMessage({
					message: `You have received 1 ${soldierConfig?.texts.singular}`,
				}),
			);
		};
	};

	// TODO Create component displaying current amount, name of item, and purchase price
	return (
		<Page className={styles.ArmyPage}>
			{config.soldiers.map((soldier) => {
				return (
					<GameTooltip
						key={soldier.id}
						name={soldier.texts.singular}
						properties={{
							'Army Offense': `+${soldier.offense} per 1`,
							'Army Defense': `+${soldier.defense} per 1`,
						}}
					>
						<button
							key={soldier.id}
							onClick={purchase(soldier)}
							disabled={coins < soldier.purchasePrice}
						>
							[{soldiers[soldier.id]}] Purchase {soldier.texts.singular} for{' '}
							{soldier.purchasePrice.toLocaleString('en-US')}
						</button>
					</GameTooltip>
				);
			})}
			<button disabled>???</button>
			<button style={{ borderBottom: 'none' }} disabled>
				???
			</button>
		</Page>
	);
};

export default ArmyPage;
