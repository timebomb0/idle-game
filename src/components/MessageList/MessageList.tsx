import React from 'react';
import { useSelector } from 'react-redux';
import cls from 'classnames';
import { AppState } from '../../state';
import styles from './MessageList.module.scss';

interface Props {
	className?: string;
}

const MessageList: React.FC<Props> = ({ className }: Props): JSX.Element => {
	const { messages } = useSelector((state: AppState) => state);
	return (
		<div className={cls(styles.MessageList, className)}>
			{messages.map((message, idx) => (
				<div key={idx} className={styles.Message}>
					{message}
				</div>
			))}
		</div>
	);
};

export default MessageList;
