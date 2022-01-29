import React from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppState, MessageState } from '../../state';
import styles from './LogsPage.module.scss';
import { Page } from '../Layout';

const LogsPage: React.FC = (): JSX.Element => {
	const messages = useSelector((state: AppState) => state.messages) as MessageState;
	dayjs.extend(relativeTime);

	return (
		<Page className={styles.LogsPage}>
			{messages.map((messageObj) => (
				<div key={messageObj.id} className={styles.Message}>
					<span className={styles.timestamp}>
						[{dayjs(messageObj.timestamp).fromNow()}]
					</span>{' '}
					{messageObj.message}
				</div>
			))}
			<ScrollableFeed></ScrollableFeed>
		</Page>
	);
};

export default LogsPage;
