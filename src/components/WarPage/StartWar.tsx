import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, AppState, SoldierState } from '../../state';
import { getArmyDefense, getArmyOffense } from '../../util';
import styles from './WarPage.module.scss';
import { EnemyArmy } from '../../types';

const StartWar: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const soldiers = useSelector<AppState>((state) => state.army.soldiers) as SoldierState;
	const enemyArmy = useSelector<AppState>((state) => state.army.enemyArmy) as EnemyArmy;

	const fight = () => {
		dispatch(actions.startWar());
	};

	return (
		<div>
			<div className={styles.playerStrength}>
				Your Army Offense: <span>{getArmyOffense(soldiers).toLocaleString('en-us')}</span>
				Your Army Defense: <span>{getArmyDefense(soldiers).toLocaleString('en-us')}</span>
			</div>
			<div className={styles.enemyStrength}>
				Enemy Army Offense: <span>{enemyArmy.offense.toLocaleString('en-us')}</span>
				Enemy Army Defense: <span>{enemyArmy.defense.toLocaleString('en-us')}</span>
			</div>
			<button className={styles.fightBtn} onClick={fight}>
				Fight
			</button>
		</div>
	);
};

export default StartWar;
