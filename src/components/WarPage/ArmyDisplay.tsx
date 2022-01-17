import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import data from '../../game_data';
import { Army, SoldierType } from '../../types';
import AnimatedText from '../AnimatedText';
import styles from './WarPage.module.scss';
import { ProgressBar } from '../ProgressBar';

interface Props {
	army: Army;
	armyMaxHealth?: number;
	isAnimated: boolean;
}
// eslint-disable-next-line react/display-name
const ArmyDisplay: React.FC<Props> = React.memo(
	({ army, armyMaxHealth, isAnimated }: Props): JSX.Element => {
		const [prevArmy, setPrevArmy] = useState(army);
		const [killedSoldierTypes, setKilledSoldierTypes] = useState([] as SoldierType[]);

		// If we're animated, track killed soldier types so we can render them in the DOM to fade them out
		useEffect(() => {
			if (!isAnimated) {
				return;
			}
			const updatedKilledSoldierTypes = (Object.keys(army).filter((soldierKey) => {
				const soldierType = (soldierKey as unknown) as SoldierType;
				if (army[soldierType] === 0 && prevArmy[soldierType] !== 0) {
					return soldierType;
				}
			}) as unknown[]) as SoldierType[];
			if (army !== prevArmy) {
				setPrevArmy(army);
			}
			if (updatedKilledSoldierTypes.length > 0) {
				setKilledSoldierTypes([...killedSoldierTypes, ...updatedKilledSoldierTypes]);
			}
		}, [army, prevArmy, setPrevArmy, killedSoldierTypes, setKilledSoldierTypes]);

		const armyRemainingHealth = Object.entries(army).reduce(
			(totalHealth, [soldierKey, soldierCount]) => {
				const soldierType = (soldierKey as unknown) as SoldierType;
				return totalHealth + data.soldiers[soldierType].health * (soldierCount || 0);
			},
			0,
		);

		return (
			<div className={styles.ArmyDisplay}>
				{armyMaxHealth ? (
					<>
						{' '}
						<ProgressBar
							progress={Math.min(
								100,
								Math.floor((armyRemainingHealth / armyMaxHealth) * 100) + 1,
							)}
						/>
						<br />
					</>
				) : null}
				{Object.keys(army)
					.filter((soldierKey) => {
						const soldierType = (soldierKey as unknown) as SoldierType;
						return (
							Number(army[soldierType]) > 0 ||
							killedSoldierTypes.includes(soldierType)
						);
					})
					.map((soldier) => {
						const soldierType = (soldier as unknown) as SoldierType;
						const isSoldierKilled = (army[soldierType] || 0) <= 0;

						return isAnimated ? (
							<div
								key={soldier}
								className={cls(styles.soldierDisplay, {
									[styles.animating]: isSoldierKilled,
								})}
							>
								{`${data.soldiers[soldierType].texts.plural}: `}
								{isAnimated ? (
									<AnimatedText className={styles.SoldierText}>
										{army[soldierType]}
									</AnimatedText>
								) : (
									army[soldierType]
								)}
							</div>
						) : (
							<div key={soldier}>
								{`${data.soldiers[soldierType].texts.plural}: ${army[soldierType]}`}
							</div>
						);
					})}
			</div>
		);
	},
);

export default ArmyDisplay;
