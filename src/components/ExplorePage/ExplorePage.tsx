import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import { ActivityType } from '../../types';
import { abbreviateNumber } from 'js-abbreviation-number';
import { ProgressButton } from '../ProgressButton';
import { tickToProgress } from '../../util';
import data from '../../game_data';
import styles from './ExplorePage.module.scss';

const ExplorePage: React.FC = (): JSX.Element => {
	const currentActivity = useSelector((state: AppState) => state.activity.currentActivity);
	const scavengeSpoils = useSelector((state: AppState) => state.spoils.scavenge);
	const { progress: tickProgress, tickCount } = useSelector((state: AppState) => state.tick);
	const dispatch = useDispatch();

	// TODO: Update this to support if scavenge is more than one tick.
	//       May wanna make util function to do this for any interval
	//       May need to track in global state how many ticks has gone on for each interval prior to that consumer being triggered
	const scavengeProgress = tickToProgress({
		ticksElapsed: tickCount,
		currentTick: tickProgress,
		tickMultiplier: data.explore.scavengeUpdateInterval,
	});

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
								<ProgressButton
									progress={scavengeProgress}
									onClick={stopScavenging}
								>
									Collect {scavengedSpoilsStr} scavenged coins
								</ProgressButton>
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
