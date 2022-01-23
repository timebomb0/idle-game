import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import { randNum } from '../../util';
import styles from './ExplorePage.module.scss';
import { ActivityType } from '../../types';
import { abbreviateNumber } from 'js-abbreviation-number';

const ExplorePage: React.FC = (): JSX.Element => {
	const currentActivity = useSelector((state: AppState) => state.activity.currentActivity);
	const scavengeSpoils = useSelector((state: AppState) => state.spoils.scavenge);
	const dispatch = useDispatch();

	const startScavenging = () => {
		dispatch(actions.setCurrentActivity(ActivityType.Scavenge));
	};

	const scavengedSpoilsStr = abbreviateNumber(scavengeSpoils);

	const stopScavenging = () => {
		dispatch(actions.incrementCoins(scavengeSpoils));
		dispatch(actions.clearScavengeSpoils());
		dispatch(actions.setCurrentActivity(ActivityType.Idle));
		dispatch(actions.appendMessage(`Gathered ${scavengedSpoilsStr} scavenged coins`));
	};

	return (
		<Page className={styles.ExplorePage}>
			<div>
				<div>
					<div>
						{currentActivity === ActivityType.Scavenge ? (
							<>
								{' '}
								<span>Scavenging...</span>
								<button onClick={stopScavenging}>
									Collect {scavengedSpoilsStr} scavenged coins
								</button>
							</>
						) : (
							<button onClick={startScavenging}>Scavenge</button>
						)}
					</div>
				</div>
			</div>
		</Page>
	);
};

export default ExplorePage;
