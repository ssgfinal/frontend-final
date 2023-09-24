import { useEffect } from 'react';
import { removeWindowWarningState, windowWarningState } from '../utils';

export const useSaveNavigateState = () => {
	useEffect(() => {
		windowWarningState();

		return () => {
			removeWindowWarningState();
		};
	}, []);
};
