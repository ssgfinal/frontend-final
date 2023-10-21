import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { openModal } from '../store/redux/modalSlice';
import { __postKaKaoLogin, authStatus, resetAuthStatus } from '../store/redux/authSlice';

export const useKakaoLogin = () => {
	const location = useLocation();
	const code = location.search.split('code=')[1];
	const dispatch = useAppDispatch();
	const status = useAppSelector(authStatus);
	const navigate = useNavigate();
	useEffect(() => {
		if (code && status === 'idle') {
			dispatch(__postKaKaoLogin({ code }));
		}

		if (code && status === 'kakao') {
			dispatch(openModal({ modalComponent: 'kakaoSignUp' }));
		}

		if (code && status === 'success') {
			navigate('/');
		}

		return () => {
			code && dispatch(resetAuthStatus);
		};
	}, [code, dispatch, status, navigate]);

	return null;
};
