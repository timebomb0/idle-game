import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import styles from './ArmyPage.module.scss';
import { SoldierType } from '../../types';
import { GameTooltip } from '../GameTooltip';
import data from '../../game_data';

const ArmyPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const coins = useSelector((state: AppState) => state.coins);
	const { soldiers } = useSelector((state: AppState) => state.army);
	const autobuyPower = useSelector((state: AppState) => state.autobuyPower);

	const purchase = (soldier: { id: SoldierType; purchasePrice: number }) => {
		return () => {
			const soldierConfig = data.soldiers.find(
				(soldierConfig) => soldierConfig.id === soldier.id,
			);
			dispatch(actions.decrementCoins(soldier.purchasePrice));
			dispatch(actions.addSoldier({ amount: 1, type: soldier.id }));
			dispatch(
				actions.appendMessage({
					message: `You have recruited 1 ${soldierConfig?.texts.singular}`,
				}),
			);
		};
	};

	const incrementAutobuy = (soldierType: SoldierType) => {
		const remainingAutobuyPower = Object.values(autobuyPower.inUse).reduce(
			(total, val) => (total += val),
			0,
		);
		if (remainingAutobuyPower < autobuyPower.total) {
			dispatch(
				actions.updateInUse({ [soldierType]: (autobuyPower.inUse[soldierType] || 0) + 1 }),
			);
		}
	};

	const decrementAutobuy = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		soldierType: SoldierType,
	) => {
		event.preventDefault();
		if (autobuyPower.inUse[soldierType] > 0) {
			dispatch(
				actions.updateInUse({ [soldierType]: (autobuyPower.inUse[soldierType] || 0) - 1 }),
			);
		}
	};

	// TODO Create component displaying current amount, name of item, and purchase price
	return (
		<Page className={styles.ArmyPage}>
			{data.soldiers.map((soldier) => {
				return (
					<div key={soldier.id} className={styles.purchaseRow}>
						<GameTooltip
							name={soldier.texts.singular}
							properties={{
								Offense: soldier.offense.toLocaleString('en-us'),
								Defense: soldier.defense.toLocaleString('en-us'),
								Health: soldier.health.toLocaleString('en-us'),
							}}
						>
							<button
								onClick={purchase(soldier)}
								disabled={coins < soldier.purchasePrice}
							>
								[{soldiers[soldier.id]}] Purchase {soldier.texts.singular} for{' '}
								{soldier.purchasePrice.toLocaleString('en-US')}
							</button>
						</GameTooltip>
						<GameTooltip
							name="Autobuy"
							description={
								<>
									30% chance every tick to autobuy{' '}
									{autobuyPower.inUse[soldier.id] || 0}{' '}
									{autobuyPower.inUse[soldier.id] !== 1
										? soldier.texts.plural
										: soldier.texts.singular}{' '}
									if you have the coins
									<br />
									Must have autobuy power.
								</>
							}
							properties={{
								'Left Click': 'Increment by 1',
								'Right Click': 'Decrement by 1',
							}}
						>
							<button
								onClick={() => incrementAutobuy(soldier.id)}
								onContextMenu={(event) => {
									decrementAutobuy(event, soldier.id);
								}}
								className={styles.autobuyBtn}
							>
								[{autobuyPower.inUse[soldier.id] || 0}] Autobuy
							</button>
						</GameTooltip>
					</div>
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
