import React from 'react';
import cls from 'classnames';
import styles from './ProgressBar.module.scss';

interface Props {
	color?: string;
	progress: number;
	className?: string;
}

const ProgressBar: React.FC<Props> = ({ className, color, progress }: Props): JSX.Element => {
	return (
		<div
			className={cls(styles.ProgressBar, className)}
			style={{
				backgroundColor: `${color || 'green'}`,
				width: `${Math.min(progress, 100)}%`,
			}}
		></div>
	);
};

export default ProgressBar;
