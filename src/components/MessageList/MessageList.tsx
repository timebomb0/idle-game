import React from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import cls from 'classnames';
import { AppState, MessageState } from '../../state';
import styles from './MessageList.module.scss';

interface Props {
	className?: string;
}

const MessageList: React.FC<Props> = ({ className }: Props): JSX.Element => {
	const messages = useSelector((state: AppState) => state.messages) as MessageState;

	return (
		<ScrollableFeed className={cls(styles.MessageList, className)}>
			{messages.map((messageObj) => (
				<div key={messageObj.id} className={styles.Message}>
					{messageObj.message}
				</div>
			))}
		</ScrollableFeed>
	);
};

export default MessageList;
