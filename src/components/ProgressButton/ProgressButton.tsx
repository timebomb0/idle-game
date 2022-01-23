import React, { Children, MouseEventHandler } from 'react';
import cls from 'classnames';
import styles from './ProgressButton.module.scss';

interface Props {
	progress: number;
	className?: string;
	isAnimated?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	isDisabled?: boolean;
	children: React.ReactNode;
}

const ProgressButton: React.FC<Props> = ({
	className,
	progress,
	isAnimated,
	onClick,
	isDisabled,
	children,
}: Props): JSX.Element => {
	return (
		<div
			className={cls(styles.ProgressButton, className, { [styles.disabled]: isDisabled })}
			onClick={isDisabled ? () => null : onClick}
		>
			<div
				className={cls(styles.progressBar, {
					[styles.animated]: isAnimated,
				})}
				style={{
					width: `${Math.min(progress, 100)}%`,
				}}
			></div>
			{children}
		</div>
	);
};

export default ProgressButton;
