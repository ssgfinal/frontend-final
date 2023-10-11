import { styled } from 'styled-components';
import { HeartIcon, FullHeartIcon } from '../../assets/icons/index';
import { useEffect, useState } from 'react';
import { isLoginFunc } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';

const HeartIcons = () => {
	const [isLike, setIsLike] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const HeartClick = () => {
		const isLogin = isLoginFunc();
		if (!isLogin) {
			const modalSize = window.innerWidth >= 1000 ? 500 : 400;
			dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
		} else {
			setIsLike(!isLike);
		}
	};

	useEffect(() => {
		let initLike: boolean;
		// TODO: 백 api 만들어지면 연결하기
		// api.get(userUrl.like).then(({ data }) => {
		// 	initLike = data.isLike;
		// 	setIsLike(initLike);
		// }); // initLike 이렇게 let으로 해보고 잘 안 먹히면 initLike를 state로 관리하기
		return () => {
			if (initLike !== isLike) {
				if (isLike) {
					api.post(userUrl.addLike);
				} else {
					// api.delete(userUrl.like);
				}
			}
		};
	}, []);

	return <HeartImg onClick={HeartClick} src={isLike ? FullHeartIcon : HeartIcon} />;
};

export default HeartIcons;

const HeartImg = styled.img`
	width: 100%;
	height: 100%;
`;
