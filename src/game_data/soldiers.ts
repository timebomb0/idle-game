import { SoldierType } from '../types';

interface SoldierData {
	id: SoldierType;
	texts: {
		singular: string;
		plural: string;
	};
	purchasePrice: number;
	offense: number;
	defense: number;
}

export default [
	{
		id: SoldierType.Peasant,
		texts: {
			singular: 'Peasant',
			plural: 'Peasants',
		},
		purchasePrice: 10,
		offense: 1,
		defense: 0,
	},
	{
		id: SoldierType.Infantry,
		texts: {
			singular: 'Infantry',
			plural: 'Infantry',
		},
		purchasePrice: 100,
		offense: 10,
		defense: 2,
	},
	{
		id: SoldierType.Guardsman,
		texts: {
			singular: 'Guardsman',
			plural: 'Guardsmen',
		},
		purchasePrice: 500,
		offense: 10,
		defense: 20,
	},
	{
		id: SoldierType.Cavalry,
		texts: {
			singular: 'Cavalry',
			plural: 'Cavalry',
		},
		purchasePrice: 800,
		offense: 30,
		defense: 6,
	},
	{
		id: SoldierType.Archer,
		texts: {
			singular: 'Archer',
			plural: 'Archers',
		},
		purchasePrice: 1500,
		offense: 100,
		defense: 0,
	},
	{
		id: SoldierType.Knight,
		texts: {
			singular: 'Knight',
			plural: 'Knights',
		},
		purchasePrice: 3500,
		offense: 90,
		defense: 100,
	},
] as SoldierData[];
