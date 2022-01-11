import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState, SoldierState } from '../../state';
import { getArmyStrength, randNum } from '../../util';
import styles from './WarPage.module.scss';
import { StatDisplay } from '../StatDisplay';
import { EnemyArmy } from '../../types';

const WarPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const soldiers = useSelector<AppState>((state) => state.soldiers) as SoldierState;
	const enemyArmy = useSelector<AppState>((state) => state.enemyArmy) as EnemyArmy;

	const fight = () => {
		return null;
	};

	return (
		<Page className={styles.WarPage}>
			<div>
				<div className={styles.playerStrength}>
					Your Army Strength:{' '}
					<span>{getArmyStrength(soldiers).toLocaleString('en-us')}</span>
				</div>
				<div className={styles.enemyStrength}>
					Enemy Army Strength: <span>{enemyArmy.strength.toLocaleString('en-us')}</span>
				</div>
				<button className={styles.fightBtn} onClick={fight}>
					Fight
				</button>
			</div>
		</Page>
	);
};

export default WarPage;
