import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../state';
import { MenuStrip } from '../MenuStrip';
import './Page.scss';

interface Props {
	children: React.ReactNode;
	className: string;
}

const Page: React.FC<Props> = ({ children, className }: Props): JSX.Element => {
	const dispatch = useDispatch();
	const getCoin = () => {
		dispatch(actions.incrementCoins(1));
	};

	return (
		<div className={`Page ${className}`}>
			<div className="main">
				<button className="increment-coins" onClick={getCoin}>
					Get Coin
				</button>
			</div>
			<div className="menu-view">{children}</div>
			<div className="bottom">
				<MenuStrip />
			</div>
		</div>
	);
};

export default Page;
