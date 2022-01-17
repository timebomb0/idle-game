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
			description: 'Sells necessities, netting you coins.',
		},
		purchasePrice: 10,
	},
	{
		id: WorkerType.Recruiter,
		texts: {
			singular: 'Recruiter',
			plural: 'Recruiters',
			description: 'Hires new soldiers for you. Must be configured using autobuy power.',
		},
		purchasePrice: 100,
	},
] as WorkerData[];
