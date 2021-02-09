import React from 'react';
import './MenuStrip.scss';
import { StatDisplay } from './StatDisplay';

const MenuStrip: React.FC = (): JSX.Element => {
	return (
		<div className="MenuStrip">
			{' '}
			<StatDisplay stat="coins" />
			<StatDisplay stat="coinsPerSecond" display="abbr" />
		</div>
	);
};

export default MenuStrip;
