import { Text, Stat } from '../types';
import { coins, armyOffense, armyDefense, reputation } from './stats';

type TextKeys = Stat;
const Texts: { [key in TextKeys]: Text } = { coins, armyOffense, armyDefense, reputation };
export default Texts;
