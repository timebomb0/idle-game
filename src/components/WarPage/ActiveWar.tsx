import React from 'react';
import { useSelector } from 'react-redux';
import data from '../../game_data';
import { Page } from '../Layout';
import { AppState, ArmyState, WarState } from '../../state';
import styles from './WarPage.module.scss';
import ArmyDisplay from './ArmyDisplay';
import { Army, SoldierType } from '../../types';

const ActiveWar: React.FC = (): JSX.Element => {
	const { soldiers: yourArmy, enemyArmy, war } = useSelector<AppState>(
		(state) => state.army,
	) as ArmyState;

	const getSoldiersRemaining = (army: Army) =>
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
	return (
		<Page className={styles.ActiveWar}>
			<div>
				<div className={styles.playerStrength}>
					Your army
					{yourSoldiersRemaining > 0 ? (
						<ArmyDisplay
							isAnimated={true}
							armyMaxHealth={yourArmyMaxHealth}
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
					Enemy army
					{enemySoldiersRemaining ? (
						<ArmyDisplay
							isAnimated={true}
							armyMaxHealth={enemyArmyMaxHealth}
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
