import React from 'react';
import { useSelector } from 'react-redux';
import { INCREMENT_VALS } from '../../../constants';
import { AppState } from '../../../state';
import Texts from '../../../texts';
import { Stat, Text } from '../../../types';
import './StatDisplay.scss';

interface Props {
	stat: Stat;
	display?: keyof Text;
}

const StatDisplay: React.FC<Props> = ({ stat, display = 'default' }: Props): JSX.Element => {
	const { coins, workers } = useSelector((state: AppState) => state);

	let val;
	if (stat == 'coins') {
		val = coins;
	} else if (stat == 'coinsPerSecond') {
		val = INCREMENT_VALS.worker * workers;
	}

	if (val === 1 && display === 'default') {
		display = 'singular';
	}

	return (
		<div>
			<b>{Texts[stat][display]}</b>: {val}
		</div>
	);
};

export default StatDisplay;
