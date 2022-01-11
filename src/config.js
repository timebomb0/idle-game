import { SoldierType, WorkerType } from './types';

export default {
	messageLimit: 200,
	grocerIncrementAmount: 1,
	enemyArmyUpdateInterval: 10,
	workers: [
		{
			id: WorkerType.Grocer,
			texts: {
				singular: 'Grocer',
				plural: 'Grocers',
				description: 'Sells necessities, making you money',
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
			strength: 1,
		},
		{
			id: SoldierType.Infantry,
			texts: {
				singular: 'Infantry',
				plural: 'Infantry',
			},
			purchasePrice: 200,
			strength: 10,
		},
		{
			id: SoldierType.Cavalry,
			texts: {
				singular: 'Cavalry',
				plural: 'Cavalry',
			},
			purchasePrice: 3000,
			strength: 50,
		},
		{
			id: SoldierType.Archer,
			texts: {
				singular: 'Archer',
				plural: 'Archers',
			},
			purchasePrice: 20000,
			strength: 200,
		},
		{
			id: SoldierType.Knight,
			texts: {
				singular: 'Knight',
				plural: 'Knights',
			},
			purchasePrice: 100000,
			strength: 500,
		},
	],
};
