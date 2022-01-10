import React from 'react';
import { useSelector } from 'react-redux';
import { abbreviateNumber } from 'js-abbreviation-number';
import { AppState } from '../../state';
import Texts from '../../texts';
import { Stat, Text } from '../../types';
import './StatDisplay.scss';

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
	if (stat in state) {
		val = state[stat as keyof AppState];
	}

	if (val === 1 && display === 'plural') {
		display = 'singular';
	}

	return (
		<div className={className ?? ''}>
			<b className={className ?? ''}>{Texts[stat][display]}</b>:{' '}
			{abbreviateNum && typeof val === 'number'
				? abbreviateNumber(val, 2, {
						// borrowed from https://idlechampions.fandom.com/wiki/Large_number_abbreviations - Thanks!
						symbols: [
							'',
							'K',
							'M',
							'B',
							't',
							'q',
							'Q',
							's',
							'S',
							'o',
							'n',
							'd',
							'U',
							'T',
							'Qt',
							'Qd',
							'Sd',
							'St',
							'O',
							'N',
							'v',
							'c',
						],
				  })
				: val}
		</div>
	);
};

export default StatDisplay;
