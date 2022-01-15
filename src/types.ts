export type Stat = 'coins' | 'armyOffense' | 'armyDefense' | 'reputation';
export interface Text {
	plural: string;
	singular: string;
	abbr?: string;
}

// WorkerType and SoldierType must be in same order as they are in the config.js array
export enum WorkerType {
	Peddler = 1,
	Baker = 2,
	Armourer = 3,
	Blacksmith = 4,
}

export enum SoldierType {
	Peasant = 1,
	Infantry = 2,
	Guardsman = 3,
	Cavalry = 4,
	Archer = 5,
	Knight = 6,
}

export interface EnemyArmy {
	offense: number;
	defense: number;
	name: string;
}
