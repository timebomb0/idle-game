import { Text, Stat } from '../types';
import { coins, coinsPerSecond } from './stats';

type TextKeys = Stat;
const Texts: { [key in TextKeys]: Text } = { coins, coinsPerSecond };
export default Texts;
