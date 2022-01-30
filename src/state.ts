/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOLDIER_MAP, STORED_STATE_KEY, WORKER_MAP } from './constants';
import { ActivityType, SoldierMap, SoldierType, WorkerType } from './types';

interface SoldierPayload {
	amount: number;
	type: SoldierType;
}
interface WorkerPayload {
	amount: number;
	type: WorkerType;
}

interface MessageItem {
	id: number;
	message: string;
	timestamp: number;
}

interface UpdateRemainingArmy {
	yourRemainingArmy: WarringArmy;
	enemyRemainingArmy: WarringArmy;
}

export interface WarringArmy {
	soldierHealths: SoldierMap;
	soldiers: SoldierMap;
}

export interface TickState {
	progress: number;
	tickCount: number;
}
export interface WarState {
	isActive: boolean;
	you: WarringArmy;
	enemy: WarringArmy;
}
export type MessageState = MessageItem[];

interface ActivityState {
	currentActivity: ActivityType;
}

export interface ArmyState {
	war: WarState;
	soldiers: SoldierMap;
	enemyArmy: SoldierMap;
}

export interface KeyModifierState {
	ctrlKey: boolean;
	shiftKey: boolean;
}

interface AutobuyPower {
	total: number;
	inUse: SoldierMap;
}

const armySlice = createSlice({
	name: 'army',
	initialState: {
		war: {
			isActive: false,
			you: { soldierHealths: { ...SOLDIER_MAP }, soldiers: { ...SOLDIER_MAP } },
			enemy: { soldierHealths: { ...SOLDIER_MAP }, soldiers: { ...SOLDIER_MAP } },
		},
		soldiers: { ...SOLDIER_MAP },
		enemyArmy: { ...SOLDIER_MAP },
	} as ArmyState,
	reducers: {
		startWar: (state) => ({
			...state,
			war: {
				isActive: true,
				you: { soldierHealths: { ...SOLDIER_MAP }, soldiers: state.soldiers },
				enemy: { soldierHealths: { ...SOLDIER_MAP }, soldiers: state.enemyArmy },
			},
		}),
		stopWar: (state) => {
			return {
				...state,
				war: {
					isActive: false,
					you: { soldierHealths: { ...SOLDIER_MAP }, soldiers: { ...SOLDIER_MAP } },
					enemy: { soldierHealths: { ...SOLDIER_MAP }, soldiers: { ...SOLDIER_MAP } },
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
		setEnemyArmy: (state, action: PayloadAction<SoldierMap>) => ({
			...state,
			enemyArmy: action.payload,
		}),
	},
});

const playerSlice = createSlice({
	name: 'player',
	initialState: { stats: {}, equipped: {}, inventory: {}, talents: {} },
	reducers: {},
});

const activitySlice = createSlice({
	name: 'activity',
	initialState: { currentActivity: ActivityType.Idle } as ActivityState,
	reducers: {
		setCurrentActivity: (state, action: PayloadAction<ActivityType>) => {
			return { ...state, currentActivity: action.payload };
		},
	},
});

const tickSlice = createSlice({
	name: 'gameTick',
	initialState: { progress: 0, tickCount: 0 } as TickState,
	reducers: {
		setTick: (state, action: PayloadAction<number>) => ({
			progress: action.payload,
			tickCount: state.tickCount,
		}),
		incrementTickCount: (state) => ({
			progress: state.progress,
			tickCount: state.tickCount === Number.MAX_VALUE ? 0 : state.tickCount + 1,
		}),
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
		inUse: { ...SOLDIER_MAP },
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

const keyModifierSlice = createSlice({
	name: 'keyModifier',
	initialState: { ctrlKey: false, shiftKey: false } as KeyModifierState,
	reducers: {
		setCtrlKey: (state, action: PayloadAction<boolean>) => ({
			...state,
			ctrlKey: action.payload,
		}),
		setShiftKey: (state, action: PayloadAction<boolean>) => ({
			...state,
			shiftKey: action.payload,
		}),
	},
});

const workersSlice = createSlice({
	name: 'workers',
	initialState: { ...WORKER_MAP },
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
		appendMessage: (state, action: PayloadAction<string>) => {
			const prevId = state[0]?.id || 1;
			let id = 0;
			if (prevId < Number.MAX_SAFE_INTEGER) {
				id = prevId + 1;
			}
			const newMessage = {
				id,
				message: action.payload || '',
				timestamp: Date.now(),
			};
			const newState = [newMessage, ...state];
			return newState;
		},
		clearMessages: () => {
			return [];
		},
	},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
	const result = next(action);
	localStorage.setItem('_gameState', JSON.stringify(store.getState()));
	return result;
};

const rehydrateStore = () => {
	const storedState = localStorage.getItem('_gameState');
	if (storedState) {
		try {
			return JSON.parse(storedState);
		} catch (e) {
			localStorage.removeItem('_gameState');
		}
	}
};

const resetSlice = createSlice({
	name: 'reset',
	initialState: null,
	reducers: {
		resetAll() {
			// This is intentionally empty.
			// Clearing redux state and localStorage happens in rootReducer.
		},
	},
});

const spoilsSlice = createSlice({
	name: 'spoils',
	initialState: { scavenge: 0, war: 0 },
	reducers: {
		addScavengeSpoils: (state, action: PayloadAction<number>) => ({
			...state,
			scavenge: state.scavenge + action.payload,
		}),
		addWarSpoils: (state, action: PayloadAction<number>) => ({
			...state,
			war: state.war + action.payload,
		}),
		clearScavengeSpoils: (state) => ({ ...state, scavenge: 0 }),
		clearWarSpoils: (state) => ({ ...state, war: 0 }),
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
	keyModifier: keyModifierSlice.reducer,
	reset: resetSlice.reducer,
	activity: activitySlice.reducer,
	player: playerSlice.reducer,
	spoils: spoilsSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === 'reset/resetAll') {
		localStorage.removeItem(STORED_STATE_KEY);
		state = undefined;
	}
	return reducer(state, action);
};
export type AppState = ReturnType<typeof reducer>;
export const appStore = configureStore({
	reducer: rootReducer,
	preloadedState: rehydrateStore(),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
export const actions = {
	...coinsSlice.actions,
	...workersSlice.actions,
	...messagesSlice.actions,
	...tickSlice.actions,
	...reputationSlice.actions,
	...armySlice.actions,
	...autobuyPowerSlice.actions,
	...keyModifierSlice.actions,
	...resetSlice.actions,
	...activitySlice.actions,
	...playerSlice.actions,
	...spoilsSlice.actions,
};
