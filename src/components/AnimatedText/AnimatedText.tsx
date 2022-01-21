import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import styles from './AnimatedText.module.scss';

interface Props {
	children: React.ReactNode;
	className?: string;
}
const AnimatedText: React.FC<Props> = ({ children, className }: Props): JSX.Element => {
	const [animating, setAnimating] = useState(false);
	const [prevChildren, setPrevChildren] = useState(children);

	useEffect(() => {
		if (children != prevChildren) {
			setPrevChildren(children);
			setAnimating(true);
		}
	}, [children, animating, setAnimating, prevChildren]);

	const handleAnimationEnd = () => {
		setAnimating(false);
	};

	return (
		<span
			className={cls(styles.AnimatedText, className, { [styles.animating]: animating })}
			onAnimationEnd={handleAnimationEnd}
		>
			{children}
		</span>
	);
};

export default AnimatedText;
