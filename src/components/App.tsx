import React from 'react';
import { IncrementorPage } from './IncrementorPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import useGameLoop from './hooks/useGameLoop';
import { Page } from './Layout/Page';

const App: React.FC = (): JSX.Element => {
	useGameLoop();

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Page className="">
							<></>
						</Page>
					</Route>
					<Route exact path="/shop">
						<IncrementorPage />
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
