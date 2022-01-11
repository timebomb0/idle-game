import { abbreviateNumber } from 'js-abbreviation-number';
import config from './config';
import { AppState, SoldierState } from './state';
import { SoldierType } from './types';

export const symbolsTexts = {
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
};

export function randNum(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getArmyStrengthStr(soldiers: SoldierState): string {
	return abbreviateNumber(
		Object.keys(soldiers).reduce<number>((totalStrength, soldierKey) => {
			const soldierType = parseInt(soldierKey) as SoldierType;
			return (
				totalStrength + soldiers[soldierType] * config.soldiers[soldierType - 1].strength
			);
		}, 0),
		2,
		symbolsTexts,
	);
}

export function getArmyStrength(soldiers: SoldierState): number {
	return Object.keys(soldiers).reduce<number>((totalStrength, soldierKey) => {
		const soldierType = parseInt(soldierKey) as SoldierType;
		return totalStrength + soldiers[soldierType] * config.soldiers[soldierType - 1].strength;
	}, 0);
}
