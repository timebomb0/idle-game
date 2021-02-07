import React, { createContext } from 'react';

// interface AppState {}

// TODO Set generic on createContext once state is being used
export const AppContext = createContext({});

interface Props {
	children: React.ReactNode;
}

export const AppContextProvider = ({ children }: Props): JSX.Element => {
	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
