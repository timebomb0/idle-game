import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import data from '../../game_data';
import { SoldierMap, SoldierType } from '../../types';
import AnimatedText from '../AnimatedText';
import styles from './WarPage.module.scss';
import { ProgressBar } from '../ProgressBar';

interface Props {
	army: SoldierMap;
	armyMaxHealth?: number;
	armyColor?: string;
	isAnimated: boolean;
}
// eslint-disable-next-line react/display-name
const ArmyDisplay: React.FC<Props> = React.memo(
	({ army, armyMaxHealth, armyColor, isAnimated }: Props): JSX.Element => {
		const [initialArmy] = useState(army);
		const [prevArmy, setPrevArmy] = useState(army);

		// If we're animated, track killed soldier types so we can render them in the DOM to fade them out
		let killedSoldierTypes: SoldierType[] = [];
		if (isAnimated) {
			killedSoldierTypes = (Object.keys(SoldierType).filter((soldierKey) => {
				if (typeof soldierKey === 'number') return false;
				return true;
			}) as unknown[]) as SoldierType[];
			if (army !== prevArmy) {
				setPrevArmy(army);
			}
		}

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
							isAnimated={isAnimated}
							color={armyColor}
							progress={Math.min(
								100,
								Math.floor((armyRemainingHealth / (armyMaxHealth || 0)) * 100) + 1,
							)}
						/>
						<br />
					</>
				) : null}
				<div className={styles.soldierContainer}>
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
							const isSoldierNotPurchased = initialArmy[soldierType] === 0;

							return isAnimated ? (
								<div
									key={soldier}
									className={cls(styles.soldierDisplay, {
										[styles.animating]: isSoldierKilled,
										[styles.permaFadedOut]: isSoldierNotPurchased,
									})}
								>
									{`${data.soldiers[soldierType].texts.plural}: `}
									{isAnimated ? (
										<AnimatedText className={styles.SoldierText}>
											{isSoldierNotPurchased
												? '-'
												: isSoldierKilled
												? 'X'
												: army[soldierType]}
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
			</div>
		);
	},
);

export default ArmyDisplay;
