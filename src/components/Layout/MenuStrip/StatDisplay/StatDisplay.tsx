import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../../../config';
import { AppState } from '../../../../state';
import Texts from '../../../../texts';
import { Stat, Text } from '../../../../types';
import './StatDisplay.scss';

interface Props {
	stat: Stat;
	display?: keyof Text;
}

const StatDisplay: React.FC<Props> = ({ stat, display = 'plural' }: Props): JSX.Element => {
	const state = useSelector((state: AppState) => state);

	let val;
	if (stat in state) {
		val = state[stat as keyof AppState];
	} else if (stat === 'coinsPerSecond') {
		val = config.incrementors.reduce(
			(result, incrementor) =>
				(result += state.incrementors[incrementor.id] * incrementor.incrementAmount || 0),
			0,
		);
	}

	if (val === 1 && display === 'plural') {
		display = 'singular';
	}

	return (
		<div>
			<b>{Texts[stat][display]}</b>: {val}
		</div>
	);
};

export default StatDisplay;
