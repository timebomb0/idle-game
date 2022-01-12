export type Stat = 'coins' | 'armyOffense' | 'armyDefense' | 'reputation';
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
