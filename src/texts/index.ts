import { Text, Stat } from '../types';
import { coins, armyStrength } from './stats';

type TextKeys = Stat;
const Texts: { [key in TextKeys]: Text } = { coins, armyStrength };
export default Texts;
