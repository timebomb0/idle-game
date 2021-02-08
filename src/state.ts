import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Purchases } from './types';

const coinsSlice = createSlice({
	name: 'coins',
	initialState: 0,
	reducers: {
		incrementCoins: (state, action: PayloadAction<number>) => state + action.payload,
		decrementCoins: (state, action: PayloadAction<number>) => state - action.payload,
	},
});

interface IncrementorPayload {
	amount: number;
	type: Purchases;
}
type IncrementorState = { [key in Purchases]: number };
const incrementorsSlice = createSlice({
	name: 'incrementors',
	initialState: {
		[Purchases.worker]: 0,
		[Purchases.noble]: 0,
	} as IncrementorState,
	reducers: {
		addIncrementor: (state, action: PayloadAction<IncrementorPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] + action.payload.amount,
			};
		},
		deleteIncrementor: (state, action: PayloadAction<IncrementorPayload>) => {
			return {
				...state,
				[action.payload.type]: state[action.payload.type] - action.payload.amount,
			};
		},
	},
});

const reducer = combineReducers({
	coins: coinsSlice.reducer,
	incrementors: incrementorsSlice.reducer,
});
export type AppState = ReturnType<typeof reducer>;
export const appStore = configureStore({
	reducer,
});
export const actions = {
	...incrementorsSlice.actions,
	...coinsSlice.actions,
};
