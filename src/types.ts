export type Stat = 'coins' | 'armyOffense' | 'armyDefense' | 'reputation';
export interface Text {
	plural: string;
	singular: string;
	abbr?: string;
}

// WorkerType and SoldierType must be in same order as they are in the config.js array
export enum WorkerType {
	Peddler,
	Baker,
	Armourer,
	Blacksmith,
}

export enum SoldierType {
	Peasant,
	Infantry,
	Guardsman,
	Cavalry,
	Archer,
	Knight,
}

export type Army = { [K in SoldierType]?: number };
