import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState, WarState } from '../../state';
import styles from './WarPage.module.scss';

const ActiveWar: React.FC = (): JSX.Element => {
	const war = useSelector<AppState>((state) => state.army.war) as WarState;

	return (
		<Page className={styles.ActiveWar}>
			<div>
				<div className={styles.playerStrength}>
					Your Remaining Army Offense:{' '}
					<span>{war.yourRemainingArmy.offense.toLocaleString('en-us')}</span>
					Your Remaining Army Defense:{' '}
					<span>{war.yourRemainingArmy.defense.toLocaleString('en-us')}</span>
				</div>
				<div className={styles.enemyStrength}>
					Remaining Enemy Army Offense:{' '}
					<span>{war.enemyRemainingArmy.offense.toLocaleString('en-us')}</span>
					Remaining Enemy Army Defense:{' '}
					<span>{war.enemyRemainingArmy.defense.toLocaleString('en-us')}</span>
				</div>
			</div>
		</Page>
	);
};

export default ActiveWar;
