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
		offense: 3,
		defense: 1,
		health: 50,
	},
	{
		id: SoldierType.Infantry,
		texts: {
			singular: 'Infantry',
			plural: 'Infantry',
		},
		purchasePrice: 100,
		offense: 50,
		defense: 20,
		health: 400,
	},
	{
		id: SoldierType.Guardsman,
		texts: {
			singular: 'Guardsman',
			plural: 'Guardsmen',
		},
		purchasePrice: 150,
		offense: 40,
		defense: 80,
		health: 600,
	},
	{
		id: SoldierType.Cavalry,
		texts: {
			singular: 'Cavalry',
			plural: 'Cavalry',
		},
		purchasePrice: 200,
		offense: 140,
		defense: 50,
		health: 500,
	},
	{
		id: SoldierType.Archer,
		texts: {
			singular: 'Archer',
			plural: 'Archers',
		},
		purchasePrice: 250,
		offense: 250,
		defense: 10,
		health: 200,
	},
	{
		id: SoldierType.Knight,
		texts: {
			singular: 'Knight',
			plural: 'Knights',
		},
		purchasePrice: 400,
		offense: 180,
		defense: 90,
		health: 700,
	},
] as SoldierData[];
