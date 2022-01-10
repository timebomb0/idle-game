export type Stat = 'coins' | 'coinsPerSecond';
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
