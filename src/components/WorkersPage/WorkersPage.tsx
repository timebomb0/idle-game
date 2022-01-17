import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import data from '../../game_data';
import styles from './WorkersPage.module.scss';
import { GameTooltip } from '../GameTooltip';
import { WorkerType } from '../../types';
import { abbreviateNumber } from 'js-abbreviation-number';

const WorkersPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, workers } = useSelector((state: AppState) => state);
	const { ctrlKey, shiftKey } = useSelector((state: AppState) => state.keyModifier);

	let purchaseModifier = 1;
	if (ctrlKey) {
		purchaseModifier = 10;
	}
	if (shiftKey) {
		purchaseModifier = 100;
	}

	const purchase = (worker: { id: WorkerType; purchasePrice: number }) => {
		return () => {
			dispatch(actions.decrementCoins(worker.purchasePrice * purchaseModifier));
			if (worker.id === WorkerType.Recruiter) {
				dispatch(actions.setAutobuyPower(workers[WorkerType.Recruiter] + purchaseModifier));
			}
			dispatch(actions.addWorker({ amount: purchaseModifier, type: worker.id }));
			dispatch(
				actions.appendMessage({
					message: `You have hired ${purchaseModifier} ${
						purchaseModifier === 1
							? data.workers[worker.id].texts.singular
							: data.workers[worker.id].texts.plural
					}`,
				}),
			);
		};
	};

	return (
		<Page className={styles.WorkersPage}>
			{data.workers.map((worker) => {
				return (
					<GameTooltip
						key={worker.id}
						name={worker.texts.singular}
						description={worker.texts.description}
					>
						<button
							key={worker.id}
							onClick={purchase(worker)}
							disabled={coins < worker.purchasePrice * purchaseModifier}
						>
							[{workers[worker.id]}] Purchase {purchaseModifier}{' '}
							{purchaseModifier === 1 ? worker.texts.singular : worker.texts.plural}{' '}
							for {abbreviateNumber(worker.purchasePrice * purchaseModifier)}
						</button>
					</GameTooltip>
				);
			})}
			<button disabled>???</button>
			<button disabled>???</button>
			<button disabled>???</button>
			<button style={{ borderBottom: 'none' }} disabled>
				???
			</button>
		</Page>
	);
};

export default WorkersPage;
