import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState } from '../../state';
import styles from './StatsPage.module.scss';
import data from '../../game_data';
import { Army, SoldierType } from '../../types';
import { getArmyValue } from '../../util';

const StatsPage: React.FC = (): JSX.Element => {
	const soldiers = useSelector<AppState>((state) => state.army.soldiers) as Army;
	const coins = useSelector<AppState>((state) => state.coins) as number;

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
		</Page>
	);
};

export default StatsPage;
