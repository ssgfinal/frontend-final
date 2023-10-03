import { useEffect } from 'react';
import { isLoginFunc } from '../utils';
import { useDispatch } from 'react-redux';
import { checkLogin, checkLogout } from '../store/redux/authSlice';

export const useLogin = () => {
	const isLogin = isLoginFunc();
	//TODO: 백에서 닉네임 보내주면
	const nickname = 'test';
	const dispatch = useDispatch();
	useEffect(() => {
		if (isLogin && nickname) {
			dispatch(checkLogin({ nickname }));
		} else {
			dispatch(checkLogout());
		}
	}, [isLogin, dispatch]);

	return isLogin;
};
