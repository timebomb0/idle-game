import { WorkerType } from '../types';

interface WorkerData {
	id: WorkerType;
	texts: {
		singular: string;
		plural: string;
		description: string;
	};
	purchasePrice: number;
}
export default [
	{
		id: WorkerType.Peddler,
		texts: {
			singular: 'Peddler',
			plural: 'Peddlers',
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
] as WorkerData[];
