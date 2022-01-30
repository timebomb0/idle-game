import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import styles from './ArmyPage.module.scss';
import { SoldierType } from '../../types';
import { GameTooltip } from '../GameTooltip';
import data from '../../game_data';
import { abbreviateNumber } from 'js-abbreviation-number';

const ArmyPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const coins = useSelector((state: AppState) => state.coins);
	const soldiers = useSelector((state: AppState) => state.army.soldiers);
	const autobuyPower = useSelector((state: AppState) => state.autobuyPower);
	const { ctrlKey, shiftKey } = useSelector((state: AppState) => state.keyModifier);

	const remainingAutobuyPower =
		autobuyPower.total -
		Object.values(autobuyPower.inUse).reduce((total, val) => (total += val), 0);
	let purchaseModifier = 1;
	if (ctrlKey) {
		purchaseModifier = 10;
	}
	if (shiftKey) {
		purchaseModifier = 100;
	}

	const purchase = (soldier: { id: SoldierType; purchasePrice: number }) => {
		return () => {
			const soldierConfig = data.soldiers.find(
				(soldierConfig) => soldierConfig.id === soldier.id,
			);
			dispatch(actions.decrementCoins(soldier.purchasePrice * purchaseModifier));
			dispatch(actions.addSoldier({ amount: purchaseModifier, type: soldier.id }));
			dispatch(
				actions.appendMessage(
					`You have recruited ${purchaseModifier} ${
						purchaseModifier === 1
							? soldierConfig?.texts.singular
							: soldierConfig?.texts.plural
					}`,
				),
			);
		};
	};

	const incrementAutobuy = (soldierType: SoldierType) => {
		if (remainingAutobuyPower >= purchaseModifier) {
			dispatch(
				actions.updateInUse({
					[soldierType]: (autobuyPower.inUse[soldierType] || 0) + purchaseModifier,
				}),
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
				actions.updateInUse({
					[soldierType]: Math.max(
						0,
						(autobuyPower.inUse[soldierType] || 0) - purchaseModifier,
					),
				}),
			);
		}
	};

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
								disabled={coins < soldier.purchasePrice * purchaseModifier}
							>
								[{soldiers[soldier.id]}] Purchase {purchaseModifier}{' '}
								{purchaseModifier === 1
									? soldier.texts.singular
									: soldier.texts.plural}{' '}
								for {abbreviateNumber(soldier.purchasePrice * purchaseModifier)}
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
								'Left Click': `Increment by ${purchaseModifier}`,
								'Right Click': `Decrement by ${purchaseModifier}`,
							}}
						>
							<button
								onClick={() => incrementAutobuy(soldier.id)}
								onContextMenu={(event) => {
									decrementAutobuy(event, soldier.id);
								}}
								className={styles.autobuyBtn}
								disabled={remainingAutobuyPower < purchaseModifier}
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
