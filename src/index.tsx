import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import App from './components/App';
import { AppContextProvider } from './components/AppContext';

ReactDOM.render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
