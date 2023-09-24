import { useEffect } from 'react';
import { removeWindowWarningState, windowWarningState } from '../utils';

const useSaveNavigateState = () => {
	useEffect(() => {
		windowWarningState();

		return () => {
			removeWindowWarningState();
		};
	}, []);
	return null;
};

export default useSaveNavigateState;
