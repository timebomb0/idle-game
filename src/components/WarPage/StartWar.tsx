import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, AppState } from '../../state';
import { SoldierMap } from '../../types';
import ArmyDisplay from './ArmyDisplay';
import styles from './WarPage.module.scss';

const StartWar: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const soldiers = useSelector<AppState>((state) => state.army.soldiers) as SoldierMap;
	const enemyArmy = useSelector<AppState>((state) => state.army.enemyArmy) as SoldierMap;

	const fight = () => {
		dispatch(actions.startWar());
	};
	return (
		<div>
			<div className={styles.playerStrength}>
				Your army<ArmyDisplay isAnimated={false} army={soldiers}></ArmyDisplay>
			</div>
			<div className={styles.enemyStrength}>
				Enemy army<ArmyDisplay isAnimated={false} army={enemyArmy}></ArmyDisplay>
			</div>
			<button className={styles.fightBtn} onClick={fight}>
				Fight
			</button>
		</div>
	);
};

export default StartWar;
