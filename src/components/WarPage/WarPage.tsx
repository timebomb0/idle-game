import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState, SoldierState, WarState } from '../../state';
import { getArmyDefense, getArmyOffense } from '../../util';
import styles from './WarPage.module.scss';
import { EnemyArmy } from '../../types';
import ActiveWar from './ActiveWar';
import StartWar from './StartWar';

const WarPage: React.FC = (): JSX.Element => {
	const { isActive: isWarActive } = useSelector<AppState>((state) => state.army.war) as WarState;

	return <Page className={styles.WarPage}>{isWarActive ? <ActiveWar /> : <StartWar />}</Page>;
};

export default WarPage;
