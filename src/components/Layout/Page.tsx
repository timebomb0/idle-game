import React from 'react';
import cls from 'classnames';
import styles from './Page.module.scss';

interface Props {
	children: React.ReactNode;
	className: string;
}

const Page: React.FC<Props> = ({ children, className }: Props): JSX.Element => {
	return <div className={cls(className, styles.Page)}>{children}</div>;
};

export default Page;
