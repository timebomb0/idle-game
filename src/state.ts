import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { warn } from 'console';
import { StatsPage } from './components/StatsPage';
import config from './config';
import { EnemyArmy, SoldierType, WorkerType } from './types';
import { getArmyDefense, getArmyOffense } from './util';

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

interface MessageItem {
	id: number;
	message: string;
}

interface UpdateRemainingArmy {
	yourRemainingArmy: ArmyStats;
	enemyRemainingArmy: ArmyStats;
}

type ArmyStats = { offense: number; defense: number };
export interface WarState {
	isActive: boolean;
	yourRemainingArmy: ArmyStats;
	enemyRemainingArmy: ArmyStats;
}
export type SoldierState = Record<SoldierType, number>;
export type WorkerState = Record<WorkerType, number>;
export type MessageState = MessageItem[];

interface ArmyState {
	war: WarState;
	soldiers: SoldierState;
	enemyArmy: EnemyArmy;
}

const armySlice = createSlice({
	name: 'army',
	initialState: {
		war: {
			isActive: false,
			yourRemainingArmy: { offense: 0, defense: 0 },
			enemyRemainingArmy: { offense: 0, defense: 0 },
		},
		soldiers: config.soldiers.reduce((result, soldier) => {
			result[soldier.id] = 0;
			return result;
		}, {} as SoldierState),
		enemyArmy: { name: '', offense: 0, defense: 0 },
	} as ArmyState,
	reducers: {
		startWar: (state) => ({
			...state,
			war: {
				isActive: true,
				yourRemainingArmy: {
					offense: getArmyOffense(state.soldiers),
					defense: getArmyDefense(state.soldiers),
				},
				enemyRemainingArmy: {
					offense: state.enemyArmy.offense,
					defense: state.enemyArmy.defense,
				},
			},
		}),
		stopWar: (state) => {
			return {
				...state,
				war: {
					isActive: false,
					yourRemainingArmy: { offense: 0, defense: 0 },
					enemyRemainingArmy: { offense: 0, defense: 0 },
				},
			};
		},
		updateRemainingArmy: (state, action: PayloadAction<UpdateRemainingArmy>) => ({
			...state,
			war: { ...state.war, ...action.payload },
		}),
		addSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				soldiers: {
					...state.soldiers,
					[action.payload.type]:
						state.soldiers[action.payload.type] + action.payload.amount,
				},
			};
		},
		deleteSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				soldiers: {
					...state.soldiers,
					[action.payload.type]:
						state.soldiers[action.payload.type] - action.payload.amount,
				},
			};
		},
		setEnemyArmy: (state, action: PayloadAction<EnemyArmy>) => ({
			...state,
			enemyArmy: action.payload,
		}),
	},
});

const tickSlice = createSlice({
	name: 'gameTick',
	initialState: 0,
	reducers: {
		setTick: (state, action: PayloadAction<number>) => action.payload,
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

const reputationSlice = createSlice({
	name: 'reputation',
	initialState: 0,
	reducers: {
		incrementReputation: (state, action: PayloadAction<number>) => state + action.payload,
		decrementReputation: (state, action: PayloadAction<number>) => state - action.payload,
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
	initialState: [] as MessageState,
	reducers: {
		appendMessage: (state, action: PayloadAction<MessagePayload>) => {
			const prevId = state[state.length - 1]?.id || 1;
			let id = 1;
			if (prevId < Number.MAX_SAFE_INTEGER) {
				id = prevId + 1;
			}
			const newMessage = {
				id,
				message: action.payload.message || '',
			};
			const newState = [...state, newMessage];
			return newState;
		},
		clearMessages: () => {
			return [];
		},
	},
});

const reducer = combineReducers({
	coins: coinsSlice.reducer,
	workers: workersSlice.reducer,
	messages: messagesSlice.reducer,
	tick: tickSlice.reducer,
	reputation: reputationSlice.reducer,
	army: armySlice.reducer,
});
export type AppState = ReturnType<typeof reducer>;
export const appStore = configureStore({
	reducer,
});
export const actions = {
	...coinsSlice.actions,
	...workersSlice.actions,
	...messagesSlice.actions,
	...tickSlice.actions,
	...reputationSlice.actions,
	...armySlice.actions,
};
