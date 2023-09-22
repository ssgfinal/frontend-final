import { useEffect } from 'react';
import { removeWindowWarningState, windowWarningState } from '../utils';

const useWindowWarning = () => {
	useEffect(() => {
		windowWarningState();

		return () => {
			removeWindowWarningState();
		};
	}, []);
	return null;
};

export default useWindowWarning;
