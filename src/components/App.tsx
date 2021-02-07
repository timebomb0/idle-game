import React from 'react';
import { MainPage } from './MainPage';
import { ShopPage } from './ShopPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = (): JSX.Element => {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<MainPage />
					</Route>
					<Route exact path="/shop">
						<ShopPage />
					</Route>
				</Switch>

				<nav>
					<ul className="MenuStrip">
						<li>
							<Link to="/">🏠</Link>
							<Link to="/shop">💲</Link>
						</li>
					</ul>
				</nav>
			</div>
		</Router>
	);
};

export default App;
