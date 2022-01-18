import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { actions, AppState } from '../../state';
import styles from './StatsPage.module.scss';
import data from '../../game_data';
import { SoldierMap, SoldierType } from '../../types';
import { getArmyValue } from '../../util';
import { STORED_STATE_KEY } from '../../constants';

const StatsPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const soldiers = useSelector<AppState>((state) => state.army.soldiers) as SoldierMap;
	const coins = useSelector<AppState>((state) => state.coins) as number;

	const resetGame = () => {
		localStorage.setItem(STORED_STATE_KEY, '');
		dispatch(actions.resetAll());
	};

	return (
		<Page className={styles.StatsPage}>
			{Object.keys(soldiers).map((soldierKey) => {
				const soldierType = parseInt(soldierKey) as SoldierType;
				const soldierCount = soldiers[soldierType] as number;
				return soldierCount > 0 ? (
					<div key={soldierKey}>
						<label>Army Stats from {data.soldiers[soldierType].texts.plural}</label>
						<span>
							Offense: +{soldierCount * data.soldiers[soldierType].offense}
							<br />
							Defense: +{soldierCount * data.soldiers[soldierType].defense}
						</span>
					</div>
				) : (
					''
				);
			})}
			<div>
				<label>Coins</label> <span>{coins.toLocaleString('en-us')}</span>
			</div>
			<div>
				<label>Army Value</label>{' '}
				<span>{getArmyValue(soldiers).toLocaleString('en-us')}</span>
			</div>
			<div>
				<button
					onClick={resetGame}
					style={{
						backgroundColor: '#990000',
						color: '#eee',
						border: '6px solid #ff0000',
					}}
				>
					Reset Everything
				</button>
			</div>
		</Page>
	);
};

export default StatsPage;
