import { useEffect, useState } from 'react';
import { isLoginFunc } from '../utils';

export const useIsLoginState = () => {
	const isLogin = isLoginFunc();
	const [isLoginState, setIsLoginState] = useState(isLogin);

	useEffect(() => {
		setIsLoginState(isLogin);
	}, [isLogin]);
	return isLoginState;
};
