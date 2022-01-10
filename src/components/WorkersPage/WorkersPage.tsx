import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import config from '../../config';
import styles from './WorkersPage.module.scss';
import { GameTooltip } from '../GameTooltip';
import { WorkerType } from '../../types';

const WorkersPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const { coins, workers } = useSelector((state: AppState) => state);

	const purchase = (worker: { id: WorkerType; purchasePrice: number }) => {
		return () => {
			dispatch(actions.decrementCoins(worker.purchasePrice));
			dispatch(actions.addWorker({ amount: 1, type: worker.id }));
		};
	};

	return (
		<Page className="WorkersPage">
			{config.workers.map((worker) => {
				return (
					<GameTooltip
						key={worker.id}
						name={worker.texts.singular}
						description={worker.texts.description}
					>
						<button
							className={styles.PurchaseButton}
							key={worker.id}
							onClick={purchase(worker)}
							disabled={coins < worker.purchasePrice}
						>
							[{workers[worker.id]}] Purchase {worker.texts.singular} for{' '}
							{worker.purchasePrice.toLocaleString('en-US')}
						</button>
					</GameTooltip>
				);
			})}
		</Page>
	);
};

export default WorkersPage;