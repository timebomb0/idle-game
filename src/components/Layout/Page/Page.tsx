import React from 'react';
import './Page.scss';

interface Props {
	children: React.ReactNode;
	className: string;
}

const Page: React.FC<Props> = ({ children, className }: Props): JSX.Element => {
	return <div className={`Page ${className}`}>{children}</div>;
};

export default Page;
