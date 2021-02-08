import { Text, Stat, Purchases } from '../types';
import { coins, coinsPerSecond } from './stats';
import { worker, noble } from './purchases';

type TextKeys = Stat | Purchases;
const Texts: { [key in TextKeys]: Text } = { coins, coinsPerSecond, worker, noble };
export default Texts;
