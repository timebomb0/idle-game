import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from './config';

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
	type: string;
}
type IncrementorState = { [key: string]: number };

const incrementorsSlice = createSlice({
	name: 'incrementors',
	initialState: config.incrementors.reduce((result, incrementor) => {
		result[incrementor.id] = 0;
		return result;
	}, {} as IncrementorState),
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
