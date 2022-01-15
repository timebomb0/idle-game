import { abbreviateNumber } from 'js-abbreviation-number';
import data from './game_data';
import { SoldierState } from './state';
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

export function getArmyDefenseText(soldiers: SoldierState): string {
	return abbreviateNumber(getArmyDefense(soldiers), 2, symbolsTexts);
}

export function getArmyDefense(soldiers: SoldierState): number {
	return Object.keys(soldiers).reduce<number>((totalDefense, soldierKey) => {
		const soldierType = parseInt(soldierKey) as SoldierType;
		return totalDefense + soldiers[soldierType] * data.soldiers[soldierType - 1].defense;
	}, 0);
}

export function getArmyOffenseText(soldiers: SoldierState): string {
	return abbreviateNumber(getArmyOffense(soldiers), 2, symbolsTexts);
}

export function getArmyOffense(soldiers: SoldierState): number {
	return Object.keys(soldiers).reduce<number>((totalOffense, soldierKey) => {
		const soldierType = parseInt(soldierKey) as SoldierType;
		return totalOffense + soldiers[soldierType] * data.soldiers[soldierType - 1].offense;
	}, 0);
}
