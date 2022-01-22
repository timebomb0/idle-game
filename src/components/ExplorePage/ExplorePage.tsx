import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import { randNum } from '../../util';
import styles from './ExplorePage.module.scss';
import { ActivityType } from '../../types';

const ExplorePage: React.FC = (): JSX.Element => {
	const currentActivity = useSelector((state: AppState) => state.activity.currentActivity);
	const dispatch = useDispatch();

	const startScavenging = () => {
		dispatch(actions.setCurrentActivity(ActivityType.Scavenge));
	};

	const stopScavenging = () => {
		dispatch(actions.setCurrentActivity(ActivityType.Idle));
	};

	return (
		<Page className={styles.ExplorePage}>
			<div>
				<div>
					<div>
						{currentActivity === ActivityType.Scavenge ? (
							<>
								{' '}
								<span>SCAVENGING...</span>
								<button onClick={stopScavenging}>Stop Scavenging</button>
							</>
						) : (
							<button onClick={startScavenging}>Start Scavenging</button>
						)}
					</div>
				</div>
			</div>
		</Page>
	);
};

export default ExplorePage;
