import React from 'react';
import { useSelector } from 'react-redux';
import { abbreviateNumber } from 'js-abbreviation-number';
import { AppState } from '../../state';
import Texts from '../../texts';
import { SoldierType, Stat, Text } from '../../types';
import './StatDisplay.scss';
import config from '../../config';
import { getArmyStrengthStr, symbolsTexts } from '../../util';

interface Props {
	stat: Stat;
	display?: keyof Text;
	abbreviateNum?: boolean;
	className?: string;
}

const StatDisplay: React.FC<Props> = ({
	className,
	stat,
	display = 'plural',
	abbreviateNum,
}: Props): JSX.Element => {
	const state = useSelector((state: AppState) => state);

	let val;
	if (stat === 'armyStrength') {
		val = getArmyStrengthStr(state.soldiers);
	} else if (stat in state) {
		val = state[stat as keyof AppState];
	}

	if (val === 1 && display === 'plural') {
		display = 'singular';
	}

	return (
		<div className={className ?? ''}>
			<b className={className ?? ''}>{Texts[stat][display]}</b>:{' '}
			{abbreviateNum && typeof val === 'number'
				? abbreviateNumber(val, 2, symbolsTexts)
				: val}
		</div>
	);
};

export default StatDisplay;
