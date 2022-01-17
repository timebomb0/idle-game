import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import data from '../../game_data';
import { Army, SoldierType } from '../../types';
import AnimatedText from '../AnimatedText';
import styles from './WarPage.module.scss';

interface Props {
	army: Army;
	isAnimated: boolean;
}
// eslint-disable-next-line react/display-name
const ArmyDisplay: React.FC<Props> = React.memo(
	({ army, isAnimated }: Props): JSX.Element => {
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

		return (
			<div className={styles.ArmyDisplay}>
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
