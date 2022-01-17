import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState, WarState } from '../../state';
import styles from './WarPage.module.scss';
import ArmyDisplay from './ArmyDisplay';
import { Army } from '../../types';

const ActiveWar: React.FC = (): JSX.Element => {
	const war = useSelector<AppState>((state) => state.army.war) as WarState;

	const getSoldiersRemaining = (army: Army) =>
		Object.values(army).reduce((num, count) => {
			return (num || 0) + (count || 0);
		}, 0) || 0;
	const yourSoldiersRemaining = getSoldiersRemaining(war.you.soldiers);
	const enemySoldiersRemaining = getSoldiersRemaining(war.enemy.soldiers);
	return (
		<Page className={styles.ActiveWar}>
			<div>
				<div className={styles.playerStrength}>
					Your army
					{yourSoldiersRemaining > 0 ? (
						<ArmyDisplay isAnimated={true} army={war.you.soldiers}></ArmyDisplay>
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
						<ArmyDisplay isAnimated={true} army={war.enemy.soldiers}></ArmyDisplay>
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
