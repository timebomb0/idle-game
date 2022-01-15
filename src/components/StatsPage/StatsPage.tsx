import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState, SoldierState } from '../../state';
import { getArmyDefense, getArmyOffense } from '../../util';
import styles from './StatsPage.module.scss';
import data from '../../game_data';
import { SoldierType } from '../../types';

const StatsPage: React.FC = (): JSX.Element => {
	const soldiers = useSelector<AppState>((state) => state.army.soldiers) as SoldierState;
	const coins = useSelector<AppState>((state) => state.coins) as number;

	return (
		<Page className={styles.StatsPage}>
			<div>
				<label>Total Army Offense</label>
				<span>{getArmyOffense(soldiers).toLocaleString('en-us')}</span>
			</div>
			<div>
				<label>Total Army Defense</label>
				<span>{getArmyDefense(soldiers).toLocaleString('en-us')}</span>
			</div>
			{Object.keys(soldiers).map((soldierKey) => {
				const soldierType = parseInt(soldierKey) as SoldierType;
				return soldiers[soldierType] > 0 ? (
					<div key={soldierKey}>
						<label>Army Stats from {data.soldiers[soldierType - 1].texts.plural}</label>
						<span>
							Offense: +
							{soldiers[soldierType] * data.soldiers[soldierType - 1].offense}
							<br />
							Defense: +
							{soldiers[soldierType] * data.soldiers[soldierType - 1].defense}
						</span>
					</div>
				) : (
					''
				);
			})}
			<div>
				<label>Coins</label> <span>{coins.toLocaleString('en-us')}</span>
			</div>
		</Page>
	);
};

export default StatsPage;
