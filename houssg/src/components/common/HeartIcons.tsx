import { styled } from 'styled-components';
import { HeartIcon, FullHeartIcon } from '../../assets/icons/index';
import { useState } from 'react';
import { isLoginFunc } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';

interface Props {
	favorite: boolean;
}

const HeartIcons: React.FC<Props> = ({ favorite }) => {
	const [heartSrc, setHeartSrc] = useState<string>(favorite ? FullHeartIcon : HeartIcon);

	const dispatch = useAppDispatch();

	const HeartClick = () => {
		const isLogin = isLoginFunc();
		if (!isLogin) {
			const modalSize = window.innerWidth >= 1000 ? 500 : 400;
			dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
		} else {
			setHeartSrc((prevHeartSrc) => (prevHeartSrc === HeartIcon ? FullHeartIcon : HeartIcon));
		}
	};

	return <HeartImg onClick={HeartClick} src={heartSrc} />;
};

export default HeartIcons;

const HeartImg = styled.img`
	width: 100%;
	height: 100%;
	/* width: 1rem; */
`;
