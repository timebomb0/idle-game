import { useEffect, useRef } from 'react';

type IntervalFunction = () => unknown | void;

export default (callback: IntervalFunction, delay: number): void => {
	const savedCallback = useRef<IntervalFunction | null>(null);

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	});

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback.current !== null) {
				savedCallback.current();
			}
		}
		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay, savedCallback]);
};
