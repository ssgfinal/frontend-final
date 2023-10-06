import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch, useAppSelector, useIsUser } from '../hooks';
import { MyHeartIcon, login, logo, logout } from '../assets/icons';
import { authUrl, ownerRoute, userRoute } from '../assets/constant';
import { checkLogout, isLoginState } from '../store/redux/authSlice';
import api from '../api/api';
import { color } from '../assets/styles';
const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isLogin = useAppSelector(isLoginState);
	const isUser = useIsUser();
	// TODO: 헤더에서 useState,useEffect 써도 될까요..? 400px이하일 때 아이콘으로 바꾸려니...
	console.log('렌더링');
	const goHomeHandler = () => {
		isUser ? navigate(userRoute.main) : navigate(ownerRoute.main);
	};

	const onChangeUserType = () => {
		navigate(isUser ? ownerRoute.main : userRoute.main);
	};

	const loginModalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
	};

	const logoutFunc = () => {
		if (window.confirm('로그아웃 하시겠습니가?')) {
			dispatch(checkLogout());
			api.post(authUrl.logout).catch((err) => {
				console.log(err);
			});
			navigate('/');
		}
	};

	return (
		<HeaderContainer>
			<LogoImg onClick={goHomeHandler} src={logo} />
			<RightIconContainer>
				{/* TODO: 스타일혹은 아이콘 */}
				<div style={{ cursor: 'pointer' }} onClick={onChangeUserType}>
					{isUser ? (
						<HostModeChange>
							<img src={MyHeartIcon}></img>
							<p>To Host</p>
						</HostModeChange>
					) : (
						<GuestModeChange>To Guest</GuestModeChange>
					)}
				</div>
				{!isLogin ? <LoginImg onClick={loginModalOpen} src={login} /> : <LoginImg onClick={logoutFunc} src={logout} />}
			</RightIconContainer>
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.header`
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding-inline: 1rem;
`;

const LogoImg = styled.img`
	height: 4rem;
	cursor: pointer;
`;
const LoginImg = styled.img`
	height: 3.2rem;
	cursor: pointer;
	padding-bottom: 0.5rem;
`;

const RightIconContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;

const HostModeChange = styled.div`
	margin: 1rem 2rem 0.4rem 0;
	padding: 0.6rem;
	border-radius: 1.5rem;
	border: 2px solid ${color.color1};
	color: ${color.color1};

	&:hover {
		color: ${color.backColor};
		background-color: ${color.color1};
		transition: all ease 2s;
		transform: rotateY(1turn);
	}

	img {
		width: 1rem;
	}

	@media (min-width: 400px) {
		img {
			display: none;
		}
	}

	@media (max-width: 400px) {
		margin: 1rem 1rem 0.4rem 0;
		font-size: 0.8rem;
		font-weight: bold;
		p {
			display: none;
		}
	}
`;

const GuestModeChange = styled.div`
	margin: 1rem 2rem 0.4rem 0;
	padding: 0.6rem;
	border: 2px solid ${color.color1};
	border-radius: 1.5rem;
	color: ${color.backColor};
	background-color: ${color.color1};

	&:hover {
		color: ${color.color1};
		background-color: ${color.backColor};
		transition: all ease 2s;
		transform: rotateY(1turn);
	}

	@media (max-width: 400px) {
		margin: 1rem 1rem 0.4rem 0;
		font-size: 0.8rem;
		font-weight: bold;
	}
`;
