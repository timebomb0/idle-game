import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from 'classnames';
import data from '../../game_data';
import { Page } from '../Layout';
import { actions, AppState, ArmyState } from '../../state';
import ArmyDisplay from './ArmyDisplay';
import { SoldierMap, SoldierType } from '../../types';
import styles from './WarPage.module.scss';

const WarPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { soldiers: yourArmy, enemyArmy, war } = useSelector<AppState>(
		(state) => state.army,
	) as ArmyState;

	const getSoldiersRemaining = (army: SoldierMap) =>
		Object.values(army).reduce((num, count) => {
			return (num || 0) + (count || 0);
		}, 0) || 0;
	const getArmyMaxHealth = (army: SoldierMap) =>
		Object.entries(army).reduce((totalHealth, [soldierKey, soldierCount]) => {
			const soldierType = (soldierKey as unknown) as SoldierType;
			return totalHealth + data.soldiers[soldierType].health * (soldierCount || 0);
		}, 0);
	const yourSoldiersRemaining = getSoldiersRemaining(war.you.soldiers);
	const enemySoldiersRemaining = getSoldiersRemaining(war.enemy.soldiers);
	const yourArmyMaxHealth = getArmyMaxHealth(yourArmy);
	const enemyArmyMaxHealth = getArmyMaxHealth(enemyArmy);

	const surrender = () => {
		dispatch(actions.appendMessage('Your army has surrendered.'));
		dispatch(actions.stopWar());
	};
	const fight = () => {
		dispatch(actions.startWar());
	};

	const yourSoldiers = war.isActive ? war.you.soldiers : yourArmy;
	const enemySoldiers = war.isActive ? war.enemy.soldiers : enemyArmy;

	return (
		<Page className={styles.WarPage}>
			<div className={styles.armyContainer}>
				<div className={cls(styles.army, styles.playerArmy)}>
					<span style={{ color: '#0000E0' }}>Your army</span>
					{!war.isActive || yourSoldiersRemaining > 0 ? (
						<ArmyDisplay
							armyMaxHealth={yourArmyMaxHealth}
							armyColor="#0000E0"
							army={yourSoldiers}
							isHealthVisible={war.isActive}
						></ArmyDisplay>
					) : (
						<div>
							NO SOLDIERS LEFT
							<br />
							ALL HOPE IS LOST
						</div>
					)}
				</div>
				<div className={cls(styles.army, styles.enemyArmy)}>
					<span style={{ color: '#E00000' }}>Enemy army</span>

					{!war.isActive || enemySoldiersRemaining > 0 ? (
						<ArmyDisplay
							armyMaxHealth={enemyArmyMaxHealth}
							armyColor="#E00000"
							army={enemySoldiers}
							isHealthVisible={war.isActive}
						></ArmyDisplay>
					) : (
						<div>
							NO SOLDIERS LEFT
							<br />
							ALL HOPE IS LOST
						</div>
					)}
				</div>

				{war.isActive ? (
					<button className={styles.surrenderBtn} onClick={surrender}>
						Surrender
					</button>
				) : null}
				{war.isActive ? null : (
					<button className={styles.fightBtn} onClick={fight}>
						Attack
					</button>
				)}
			</div>
		</Page>
	);
};

export default WarPage;
