/* eslint-disable @typescript-eslint/no-explicit-any */
import data from './game_data';
import { SoldierMap, SoldierType } from './types';

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

export function getArmyValue(soldiers: SoldierMap): number {
	return Object.keys(soldiers).reduce((value, soldier) => {
		const soldierType = (soldier as unknown) as SoldierType;
		value += data.soldiers[soldierType].purchasePrice * (soldiers[soldierType] as number);
		return value;
	}, 0);
}

export function flattenObj<T>(obj: Record<any, T[]>): T[] {
	return Object.keys(obj).reduce(function (r: any[], k) {
		return Array.prototype.concat.call(r, obj[k]);
	}, []);
}
