import { useEffect } from 'react';
import { isLoginFunc } from '../utils';
import { useDispatch } from 'react-redux';
import { checkLogin, checkLogout } from '../store/redux/authSlice';

export const useLogin = () => {
	const isLogin = isLoginFunc();
	const dispatch = useDispatch();
	useEffect(() => {
		if (isLogin) {
			dispatch(checkLogin());
		} else {
			dispatch(checkLogout());
		}
	}, [isLogin, dispatch]);

	return isLogin;
};
