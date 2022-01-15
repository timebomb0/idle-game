import React from 'react';
import { useSelector } from 'react-redux';
import { Page } from '../Layout';
import { AppState, WarState } from '../../state';
import styles from './WarPage.module.scss';
import ActiveWar from './ActiveWar';
import StartWar from './StartWar';

const WarPage: React.FC = (): JSX.Element => {
	const { isActive: isWarActive } = useSelector<AppState>((state) => state.army.war) as WarState;

	return <Page className={styles.WarPage}>{isWarActive ? <ActiveWar /> : <StartWar />}</Page>;
};

export default WarPage;
