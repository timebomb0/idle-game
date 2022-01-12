import { SoldierType, WorkerType } from './types';

export default {
	messageLimit: 200,
	grocerIncrementAmount: 1,
	enemyArmyUpdateInterval: 5,
	workers: [
		{
			id: WorkerType.Grocer,
			texts: {
				singular: 'Grocer',
				plural: 'Grocers',
				description: 'Sells necessities, netting you coins',
			},
			purchasePrice: 10,
		},
		{
			id: WorkerType.Baker,
			texts: {
				singular: 'Baker',
				plural: 'Bakers',
				description: 'Feeds your soldiers, increasing their morale',
			},
			purchasePrice: 10,
		},
		{
			id: WorkerType.Armourer,
			texts: {
				singular: 'Armourer',
				plural: 'Armourers',
				description: 'Crafts armor for your soldiers, increasing their defense',
			},
			purchasePrice: 10,
		},
		{
			id: WorkerType.Blacksmith,
			texts: {
				singular: 'Blacksmith',
				plural: 'Blacksmiths',
				description: 'Forges weapons for your soldiers, increasing their attack',
			},
			purchasePrice: 10,
		},
	],
	soldiers: [
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
	],
};
