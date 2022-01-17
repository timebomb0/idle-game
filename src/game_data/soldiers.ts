import { SoldierType } from '../types';

export interface SoldierData {
	id: SoldierType;
	texts: {
		singular: string;
		plural: string;
	};
	purchasePrice: number;
	offense: number;
	defense: number;
	health: number;
}

export default [
	{
		id: SoldierType.Peasant,
		texts: {
			singular: 'Peasant',
			plural: 'Peasants',
		},
		purchasePrice: 10,
		offense: 100,
		defense: 10,
		health: 100,
	},
	{
		id: SoldierType.Infantry,
		texts: {
			singular: 'Infantry',
			plural: 'Infantry',
		},
		purchasePrice: 100,
		offense: 300,
		defense: 50,
		health: 300,
	},
	{
		id: SoldierType.Guardsman,
		texts: {
			singular: 'Guardsman',
			plural: 'Guardsmen',
		},
		purchasePrice: 500,
		offense: 200,
		defense: 80,
		health: 500,
	},
	{
		id: SoldierType.Cavalry,
		texts: {
			singular: 'Cavalry',
			plural: 'Cavalry',
		},
		purchasePrice: 800,
		offense: 500,
		defense: 70,
		health: 300,
	},
	{
		id: SoldierType.Archer,
		texts: {
			singular: 'Archer',
			plural: 'Archers',
		},
		purchasePrice: 1500,
		offense: 1000,
		defense: 20,
		health: 200,
	},
	{
		id: SoldierType.Knight,
		texts: {
			singular: 'Knight',
			plural: 'Knights',
		},
		purchasePrice: 3500,
		offense: 400,
		defense: 100,
		health: 600,
	},
] as SoldierData[];
