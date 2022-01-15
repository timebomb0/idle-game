import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ArmyPage } from './ArmyPage';
import useGameLoop from './hooks/useGameLoop';
import { Page } from './Layout';
import { WorkersPage } from './WorkersPage';
import { MessageList } from './MessageList';
import styles from './App.module.scss';
import { ExplorePage } from './ExplorePage';
import { MainStats } from './MainStats';
import WarPage from './WarPage/WarPage';
import { StatsPage } from './StatsPage';
import { getArmyDefense, getArmyOffense } from '../util';
import { useSelector } from 'react-redux';
import { AppState } from '../state';

const App: React.FC = (): JSX.Element => {
	const soldiers = useSelector((state: AppState) => state.army.soldiers);
	useGameLoop();

	// TODO: Abstract out locking/unlocking link restrictions (e.g. 10 army strength to access War)
	return (
		<Router>
			<div className={styles.AppContainer}>
				<div className={styles.App}>
					<div className={styles.GameContent}>
						<MainStats className={styles.MainStats} />
						<ul className={styles.Menu}>
							<li>
								<Link to="/">Explore</Link>
							</li>
							<li>
								<Link to="/shop">Shop</Link>
							</li>
							<li>
								<Link to="/workers">Workers</Link>
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
								{getArmyOffense(soldiers) + getArmyDefense(soldiers) >= 10 ? (
									<Link to="/war">War</Link>
								) : (
									<a className={styles.disabled}>???</a>
								)}
							</li>
							<li>
								<Link to="/duels">Duels</Link>
							</li>
							<li>
								<Link to="/stats">Stats</Link>
							</li>
						</ul>
						<div className={styles.Content}>
							<Switch>
								<Route exact path="/">
									<ExplorePage />
								</Route>
								<Route exact path="/shop">
									<Page className="">
										<></>
									</Page>
								</Route>
								<Route exact path="/workers">
									<WorkersPage />
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
									<WarPage />
								</Route>
								<Route exact path="/duels">
									<Page className="">
										<></>
									</Page>
								</Route>
								<Route exact path="/stats">
									<StatsPage />
								</Route>
							</Switch>
						</div>
					</div>
					<MessageList className={styles.MessageList} />
				</div>
			</div>
		</Router>
	);
};

export default App;
