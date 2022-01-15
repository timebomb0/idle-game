import { actions, WarState } from '../../../state';
import { Dispatch } from '@reduxjs/toolkit';
import { randNum } from '../../../util';

// TODO: Improve dmg algorithm, need to have it scale so it can handle very high atk and defense
//       alternatively could implement new army health stat, may be easier algorithm-wise
//       Should also always have chance to do minimum 2 damage [when numbers get low enough dmg is always 1 right now]
//       ...May be best and most interesting to do a more complex battle logic
//       that pits every individual soldier in each army vs one-another with some simple AI
//       killing off soldiers during the war as they take eachother's lives
export default function ({ war, dispatch }: { war: WarState; dispatch: Dispatch }): void {
	let yourDamageDealt =
		(war.yourRemainingArmy.offense / 10) * (100 / (100 + war.enemyRemainingArmy.defense));
	let enemyDamageDealt =
		(war.enemyRemainingArmy.offense / 10) * (100 / (100 + war.yourRemainingArmy.defense ?? 10));
	yourDamageDealt = Math.max(
		1,
		Math.round(randNum(yourDamageDealt * 0.9, yourDamageDealt * 1.5)),
	);
	enemyDamageDealt = Math.max(
		1,
		Math.round(randNum(enemyDamageDealt * 0.9, enemyDamageDealt * 1.5)),
	);

	const updatedArmyStats = {
		yourRemainingArmy: {
			offense:
				war.yourRemainingArmy.defense > 0
					? war.yourRemainingArmy.offense
					: Math.max(0, war.yourRemainingArmy.offense - enemyDamageDealt),
			defense:
				war.yourRemainingArmy.defense > 0
					? Math.max(0, war.yourRemainingArmy.defense - enemyDamageDealt)
					: 0,
		},
		enemyRemainingArmy: {
			offense:
				war.enemyRemainingArmy.defense > 0
					? war.enemyRemainingArmy.offense
					: Math.max(0, war.enemyRemainingArmy.offense - yourDamageDealt),
			defense:
				war.enemyRemainingArmy.defense > 0
					? Math.max(0, war.enemyRemainingArmy.defense - yourDamageDealt)
					: 0,
		},
	};
	dispatch(actions.updateRemainingArmy(updatedArmyStats));
	if (
		updatedArmyStats.enemyRemainingArmy.defense === 0 &&
		updatedArmyStats.enemyRemainingArmy.offense === 0
	) {
		// TODO: Generate difficulty modifier [compare atk+def of your army vs enemy]
		//       and use to modify repgainamount
		const repGainAmount =
			updatedArmyStats.yourRemainingArmy.defense + updatedArmyStats.yourRemainingArmy.offense;
		dispatch(
			actions.appendMessage({
				message: `You have won the war and gained ${repGainAmount} reputation`,
			}),
		);
		dispatch(actions.stopWar());
		dispatch(actions.incrementReputation(repGainAmount));
		// TODO: add won war logic/rewards
	} else if (
		updatedArmyStats.yourRemainingArmy.defense === 0 &&
		updatedArmyStats.yourRemainingArmy.offense === 0
	) {
		dispatch(actions.appendMessage({ message: 'You have lost the war' }));

		dispatch(actions.stopWar());
		// TODO: add lost war logic/rewards
	}
	return;
}
