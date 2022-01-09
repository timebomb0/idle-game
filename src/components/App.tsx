import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ArmyPage } from './ArmyPage';
import useGameLoop from './hooks/useGameLoop';
import { Page } from './Layout';
import styles from './App.module.scss';

const App: React.FC = (): JSX.Element => {
	useGameLoop();

	return (
		<Router>
			<div className={styles.AppContainer}>
				<div className={styles.App}>
					<ul className={styles.Menu}>
						<li>
							<Link to="/">Overview</Link>
						</li>
						<li>
							<Link to="/training">Training</Link>
						</li>
						<li>
							<Link to="/army">Army</Link>
						</li>
						<li>
							<Link to="/missions">Missions</Link>
						</li>
						<li>
							<Link to="/war">War</Link>
						</li>
						<li>
							<Link to="/duels">Duels</Link>
						</li>
					</ul>
					<div className={styles.Content}>
						<Switch>
							<Route exact path="/">
								<Page className="">
									<></>
								</Page>
							</Route>
							<Route exact path="/training">
								<Page className="">
									<></>
								</Page>
							</Route>
							<Route exact path="/army">
								<ArmyPage />
							</Route>
							<Route exact path="/missions">
								<Page className="">
									<></>
								</Page>
							</Route>
							<Route exact path="/war">
								<Page className="">
									<></>
								</Page>
							</Route>
							<Route exact path="/duels">
								<Page className="">
									<></>
								</Page>
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
};

export default App;
