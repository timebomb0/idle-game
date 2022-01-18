import data from './game_data';
import { SoldierMap, WorkerMap } from './types';

export const LOOP_MS = 1000;
export const STORED_STATE_KEY = '__gameState';
export const SOLDIER_MAP = data.soldiers.reduce((result, soldier) => {
	result[soldier.id] = 0;
	return result;
}, {} as SoldierMap);
export const WORKER_MAP = data.workers.reduce((result, worker) => {
	result[worker.id] = 0;
	return result;
}, {} as WorkerMap);
