import React from 'react';
import cls from 'classnames';
import styles from './GameTooltip.module.scss';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

interface Props {
	className?: string;
	children: React.ReactElement;
	name?: string;
	description?: React.ReactElement | string;
	properties?: Record<string, string>;
}

const GameTooltip: React.FC<Props> = ({
	className,
	children,
	name,
	description,
	properties,
}: Props): JSX.Element => {
	const {
		getArrowProps,
		getTooltipProps,
		setTooltipRef,
		setTriggerRef,
		visible,
	} = usePopperTooltip();
	return (
		<>
			<span ref={setTriggerRef}>{children}</span>
			{visible && (
				<div
					ref={setTooltipRef}
					{...getTooltipProps({ className: cls(className, 'tooltip-container') })}
				>
					<div {...getArrowProps({ className: 'tooltip-arrow' })} />
					{name && <div className={styles.Name}>{name}</div>}
					{description && <div className={styles.Description}>{description}</div>}
					{properties && (
						<ul className={styles.Properties}>
							{Object.keys(properties).map((propertyKey) => (
								<li key={propertyKey}>
									<b>{propertyKey}</b>: {properties[propertyKey]}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</>
	);
};

export default GameTooltip;
