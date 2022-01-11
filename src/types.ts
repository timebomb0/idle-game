export type Stat = 'coins' | 'armyStrength';
export interface Text {
	plural: string;
	singular: string;
	abbr?: string;
}

export enum WorkerType {
	Baker = 1,
	Grocer = 2,
	Armourer = 3,
	Blacksmith = 4,
}

export enum SoldierType {
	Peasant = 1,
	Infantry = 2,
	Cavalry = 3,
	Archer = 4,
	Knight = 5,
}

export interface EnemyArmy {
	strength: number;
	name: string;
}
