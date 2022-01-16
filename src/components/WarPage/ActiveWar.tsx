import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState, WarState } from '../../state';
import styles from './WarPage.module.scss';
import ArmyDisplay from './ArmyDisplay';

const ActiveWar: React.FC = (): JSX.Element => {
	const war = useSelector<AppState>((state) => state.army.war) as WarState;

	return (
		<Page className={styles.ActiveWar}>
			<div>
				<div className={styles.playerStrength}>
					Your army<ArmyDisplay army={war.yourRemainingArmy}></ArmyDisplay>
				</div>
				<div className={styles.enemyStrength}>
					Enemy army<ArmyDisplay army={war.enemyRemainingArmy}></ArmyDisplay>
				</div>
			</div>
		</Page>
	);
};

export default ActiveWar;
