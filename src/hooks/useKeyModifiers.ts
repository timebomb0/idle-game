import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, AppState, KeyModifierState } from '../state';

export default (): void => {
	const keyModifier = useSelector<AppState>((state) => state.keyModifier) as KeyModifierState;
	const dispatch = useDispatch();

	useEffect(() => {
		document.addEventListener('keydown', KeyModifierEventHandler);
		document.addEventListener('keyup', KeyModifierEventHandler);

		return () => {
			document.removeEventListener('keydown', KeyModifierEventHandler);
			document.removeEventListener('keyup', KeyModifierEventHandler);
		};
	});

	function KeyModifierEventHandler(event: KeyboardEvent) {
		if (event.ctrlKey !== keyModifier.ctrlKey) {
			dispatch(actions.setCtrlKey(event.ctrlKey));
		}
		if (event.shiftKey !== keyModifier.shiftKey) {
			dispatch(actions.setShiftKey(event.shiftKey));
		}
	}
};
