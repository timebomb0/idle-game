import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Page } from '../Layout';
import { AppState, SoldierState } from '../../state';
import { getArmyStrength } from '../../util';
import styles from './StatsPage.module.scss';
import config from '../../config';
import { SoldierType } from '../../types';

const StatsPage: React.FC = (): JSX.Element => {
	const soldiers = useSelector<AppState>((state) => state.soldiers) as SoldierState;
	const coins = useSelector<AppState>((state) => state.coins) as number;

	return (
		<Page className={styles.StatsPage}>
			<div>
				<label>Total Army Strength</label>
				<span>{getArmyStrength(soldiers).toLocaleString('en-us')}</span>
			</div>
			{Object.keys(soldiers).map((soldierKey) => {
				const soldierType = parseInt(soldierKey) as SoldierType;
				return soldiers[soldierType] > 0 ? (
					<div key={soldierKey}>
						<label>
							Army Strength from {config.soldiers[soldierType - 1].texts.plural}
						</label>
						<span>
							{soldiers[soldierType] * config.soldiers[soldierType - 1].strength}
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
