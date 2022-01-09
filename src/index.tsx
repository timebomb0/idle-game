import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './normalize.css';
import './global.scss';
import App from './components/App';
import { appStore } from './state';
ReactDOM.render(
	<React.StrictMode>
		<Provider store={appStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
