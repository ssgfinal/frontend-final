import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api';
import { useAppDispatch } from '.';
import { openModal } from '../store/redux/modalSlice';

export const useKakaoLogin = () => {
	const location = useLocation();
	const code = location.search.split('code=')[1];
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (code) {
			dispatch(openModal({ modalComponent: 'kakaoSignUp' }));

			// api
			// 	.post('')
			// 	.then(({ data }) => {
			// 		console.log(data);
			// 	})
			// 	.catch((err) => console.log(err));
		}
	}, [code, dispatch]);

	return null;
};
