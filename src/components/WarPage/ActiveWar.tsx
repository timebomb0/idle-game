import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '../../game_data';
import { Page } from '../Layout';
import { actions, AppState, ArmyState, WarState } from '../../state';
import styles from './WarPage.module.scss';
import ArmyDisplay from './ArmyDisplay';
import { SoldierMap, SoldierType } from '../../types';

const ActiveWar: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { soldiers: yourArmy, enemyArmy, war } = useSelector<AppState>(
		(state) => state.army,
	) as ArmyState;

	const getSoldiersRemaining = (army: SoldierMap) =>
		Object.values(army).reduce((num, count) => {
			return (num || 0) + (count || 0);
		}, 0) || 0;
	const yourSoldiersRemaining = getSoldiersRemaining(war.you.soldiers);
	const enemySoldiersRemaining = getSoldiersRemaining(war.enemy.soldiers);
	const yourArmyMaxHealth = Object.entries(yourArmy).reduce(
		(totalHealth, [soldierKey, soldierCount]) => {
			const soldierType = (soldierKey as unknown) as SoldierType;
			return totalHealth + data.soldiers[soldierType].health * (soldierCount || 0);
		},
		0,
	);
	const enemyArmyMaxHealth = Object.entries(enemyArmy).reduce(
		(totalHealth, [soldierKey, soldierCount]) => {
			const soldierType = (soldierKey as unknown) as SoldierType;
			return totalHealth + data.soldiers[soldierType].health * (soldierCount || 0);
		},
		0,
	);

	const surrender = () => {
		dispatch(actions.appendMessage({ message: 'Your army has surrendered.' }));
		dispatch(actions.stopWar());
	};

	return (
		<Page className={styles.ActiveWar}>
			<div>
				<button className={styles.surrenderBtn} onClick={surrender}>
					Surrender
				</button>
				<div className={styles.playerStrength}>
					<span style={{ color: '#0000E0' }}>Your army</span>
					{yourSoldiersRemaining > 0 ? (
						<ArmyDisplay
							isAnimated={true}
							armyMaxHealth={yourArmyMaxHealth}
							armyColor="#0000E0"
							army={war.you.soldiers}
						></ArmyDisplay>
					) : (
						<div>
							NO SOLDIERS LEFT
							<br />
							ALL HOPE IS LOST
						</div>
					)}
				</div>
				<div className={styles.enemyStrength}>
					<span style={{ color: '#E00000' }}>Enemy army</span>

					{enemySoldiersRemaining ? (
						<ArmyDisplay
							isAnimated={true}
							armyMaxHealth={enemyArmyMaxHealth}
							armyColor="#E00000"
							army={war.enemy.soldiers}
						></ArmyDisplay>
					) : (
						<div>
							NO SOLDIERS LEFT
							<br />
							ALL HOPE IS LOST
						</div>
					)}
				</div>
			</div>
		</Page>
	);
};

export default ActiveWar;
