import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from './game_data';
import { Army, SoldierType, WorkerType } from './types';

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
	yourRemainingArmy: WarringArmy;
	enemyRemainingArmy: WarringArmy;
}

export interface WarringArmy {
	soldierHealths: Army | Record<string, never>;
	soldiers: Army | Record<string, never>;
}

export interface WarState {
	isActive: boolean;
	you: WarringArmy;
	enemy: WarringArmy;
}
export type WorkerState = Record<WorkerType, number>;
export type MessageState = MessageItem[];

export interface ArmyState {
	war: WarState;
	soldiers: Army;
	enemyArmy: Army;
}

interface AutobuyPower {
	total: number;
	inUse: Record<SoldierType, number>;
}

const armySlice = createSlice({
	name: 'army',
	initialState: {
		war: {
			isActive: false,
			you: { soldierHealths: {}, soldiers: {} },
			enemy: { soldierHealths: {}, soldiers: {} },
		},
		soldiers: data.soldiers.reduce((result, soldier) => {
			result[soldier.id] = 0;
			return result;
		}, {} as Army),
		enemyArmy: data.soldiers.reduce((result, soldier) => {
			result[soldier.id] = 0;
			return result;
		}, {} as Army),
	} as ArmyState,
	reducers: {
		startWar: (state) => ({
			...state,
			war: {
				isActive: true,
				you: { soldierHealths: {}, soldiers: state.soldiers },
				enemy: { soldierHealths: {}, soldiers: state.enemyArmy },
			},
		}),
		stopWar: (state) => {
			return {
				...state,
				war: {
					isActive: false,
					you: { soldierHealths: {}, soldiers: {} },
					enemy: { soldierHealths: {}, soldiers: {} },
				},
			};
		},
		updateRemainingArmy: (state, action: PayloadAction<UpdateRemainingArmy>) => ({
			...state,
			war: {
				...state.war,
				you: action.payload.yourRemainingArmy,
				enemy: action.payload.enemyRemainingArmy,
			},
		}),
		addSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				soldiers: {
					...state.soldiers,
					[action.payload.type]:
						(state.soldiers[action.payload.type] as number) + action.payload.amount,
				},
			};
		},
		deleteSoldier: (state, action: PayloadAction<SoldierPayload>) => {
			return {
				...state,
				soldiers: {
					...state.soldiers,
					[action.payload.type]:
						(state.soldiers[action.payload.type] as number) - action.payload.amount,
				},
			};
		},
		setEnemyArmy: (state, action: PayloadAction<Army>) => ({
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

const autobuyPowerSlice = createSlice({
	name: 'autobuyPower',
	initialState: {
		total: 0,
		inUse: {},
	} as AutobuyPower,
	reducers: {
		updateInUse: (state, action: PayloadAction<Partial<Record<SoldierType, number>>>) => ({
			...state,
			inUse: { ...state.inUse, ...action.payload },
		}),
		setAutobuyPower: (state, action: PayloadAction<number>) => ({
			...state,
			total: action.payload,
		}),
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
	initialState: data.workers.reduce((result, soldier) => {
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
	autobuyPower: autobuyPowerSlice.reducer,
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
	...autobuyPowerSlice.actions,
};
