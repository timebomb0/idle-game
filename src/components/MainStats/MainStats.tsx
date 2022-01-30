import React from 'react';
import cls from 'classnames';
import styles from './MainStats.module.scss';
import { StatDisplay } from '../StatDisplay';
import { AppState } from '../../state';
import { useSelector } from 'react-redux';
import { getActivityText } from '../../util';

interface Props {
	className: string;
}

const MainStats: React.FC<Props> = ({ className }: Props): JSX.Element => {
	const activity = useSelector((state: AppState) => state.activity.currentActivity);
	return (
		<div className={cls(className, styles.MainStats)}>
			<div className={styles.activity}>Current Activity: {getActivityText(activity)}</div>
			<StatDisplay className={styles.Stat} stat="coins" abbreviateNum={true} />
			<StatDisplay className={styles.Stat} stat="reputation" abbreviateNum={true} />
		</div>
	);
};

export default MainStats;
