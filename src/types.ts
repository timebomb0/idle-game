export type Stat = 'coins' | 'coinsPerSecond';
export enum Purchases {
	worker = 'worker',
	noble = 'noble',
}
export interface Text {
	plural: string;
	singular: string;
	abbr?: string;
}
