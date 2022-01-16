import React from 'react';
import data from '../../game_data';
import { Army, SoldierType } from '../../types';
import styles from './WarPage.module.scss';

interface Props {
	army: Army;
}
const ArmyDisplay: React.FC<Props> = ({ army }: Props): JSX.Element => {
	return (
		<div className={styles.ArmyDisplay}>
			{Object.keys(army)
				.filter((soldier) => {
					return Number(army[(soldier as unknown) as SoldierType]) > 0;
				})
				.map((soldier) => {
					const soldierType = (soldier as unknown) as SoldierType;
					return (
						<div key={soldier}>
							{`${data.soldiers[soldierType].texts.plural}: ${army[soldierType]}`}
						</div>
					);
				})}
		</div>
	);
};

export default ArmyDisplay;
