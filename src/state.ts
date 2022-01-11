import {
	Action,
	combineReducers,
	configureStore,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import config from './config';
import { EnemyArmy, SoldierType, WorkerType } from './types';

interface SoldierPayload {
	amount: number;
	type: SoldierType;
}
interface WorkerPayload {
	amount: number;
	type: WorkerType;
}
interface MessagePayload {
	message?: string;
}

export type SoldierState = Record<SoldierType, number>;
type WorkerState = Record<WorkerType, number>;

const tickSlice = createSlice({
	name: 'gameTick',
	initialState: 0,
	reducers: {
		setTick: (state, action: PayloadAction<number>) => action.payload,
	},
});

const enemyArmySlice = createSlice({
	name: 'enemyArmy',
	initialState: { name: '', strength: 0 },
	reducers: {
		setEnemyArmy: (state, action: PayloadAction<EnemyArmy>) => action.payload,
	},
});

const coinsSlice = createSlice({
	name: 'coins',
	initialState: 0,
	reducers: {
		incrementCoins: (state, action: PayloadAction<number>) => state + action.payload,
		decrementCoins: (state, action: PayloadAction<number>) => state - action.payload,
	},
});

const soldiersSlice = createSlice({
	name: 'soldiers',
	initialState: config.soldiers.reduce((result, soldier) => {
		result[soldier.id] = 0;
		return result;
	}, {} as SoldierState),
	reducers: {
		addSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] + action.payload.amount,
			};
		},
		deleteSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] - action.payload.amount,
			};
		},
	},
});

const workersSlice = createSlice({
	name: 'workers',
	initialState: config.workers.reduce((result, soldier) => {
		result[soldier.id] = 0;
		return result;
	}, {} as WorkerState),
	reducers: {
		addWorker: (state, action: PayloadAction<WorkerPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] + action.payload.amount,
			};
		},
		deleteWorker: (state, action: PayloadAction<WorkerPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] - action.payload.amount,
			};
		},
	},
});

const messagesSlice = createSlice({
	name: 'messages',
	initialState: [] as string[],
	reducers: {
		appendMessage: (state, action: PayloadAction<MessagePayload>) => {
			const newState = [action.payload.message || '', ...state];
			if (newState.length > config.messageLimit) {
				newState.splice(newState.length - 1, 1);
			}
			return newState;
		},
		clearMessages: () => {
			return [];
		},
	},
});

const reducer = combineReducers({
	coins: coinsSlice.reducer,
	soldiers: soldiersSlice.reducer,
	workers: workersSlice.reducer,
	messages: messagesSlice.reducer,
	enemyArmy: enemyArmySlice.reducer,
	tick: tickSlice.reducer,
});
export type AppState = ReturnType<typeof reducer>;
export const appStore = configureStore({
	reducer,
});
export const actions = {
	...soldiersSlice.actions,
	...coinsSlice.actions,
	...workersSlice.actions,
	...messagesSlice.actions,
	...enemyArmySlice.actions,
	...tickSlice.actions,
};
