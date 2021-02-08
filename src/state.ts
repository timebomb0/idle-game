import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const coinsSlice = createSlice({
	name: 'coins',
	initialState: 0,
	reducers: {
		incrementCoins: (state, action: PayloadAction<number>) => state + action.payload,
		decrementCoins: (state, action: PayloadAction<number>) => state - action.payload,
	},
});

const workersSlice = createSlice({
	name: 'workers',
	initialState: 0,
	reducers: {
		incrementWorkers: (state, action: PayloadAction<number>) => state + action.payload,
		decrementWorkers: (state, action: PayloadAction<number>) => state - action.payload,
	},
});

const reducer = combineReducers({ coins: coinsSlice.reducer, workers: workersSlice.reducer });
export type AppState = ReturnType<typeof reducer>;
export const appStore = configureStore({
	reducer,
});
export const actions = {
	...workersSlice.actions,
	...coinsSlice.actions,
};
