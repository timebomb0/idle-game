import React from 'react';
import cls from 'classnames';
import styles from './MainStats.module.scss';
import { StatDisplay } from '../StatDisplay';
import { ProgressBar } from '../ProgressBar';
import { AppState } from '../../state';
import { useSelector } from 'react-redux';

interface Props {
	className: string;
}

const MainStats: React.FC<Props> = ({ className }: Props): JSX.Element => {
	const tick = useSelector((state: AppState) => state.tick);
	return (
		<div className={cls(className, styles.MainStats)}>
			<ProgressBar progress={tick} />
			<StatDisplay className={styles.Stat} stat="coins" abbreviateNum={true} />
			<StatDisplay className={styles.Stat} stat="armyOffense" abbreviateNum={true} />
			<StatDisplay className={styles.Stat} stat="armyDefense" abbreviateNum={true} />
			<StatDisplay className={styles.Stat} stat="reputation" abbreviateNum={true} />
		</div>
	);
};

export default MainStats;
