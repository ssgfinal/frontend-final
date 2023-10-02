import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch, useIsLoginState, useIsUser } from '../hooks';
import { login, logo, logout } from '../assets/icons';
import { ownerRoute, userRoute } from '../assets/constant';

const Header = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const isUser = useIsUser();

	const isLogin = useIsLoginState();
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
			sessionStorage.removeItem('authorization');
		}
	};
	return (
		<HeaderContainer>
			<LogoImg onClick={goHomeHandler} src={logo} />
			<RightIconContainer>
				{/* TODO: 스타일혹은 아이콘 */}
				<div style={{ cursor: 'pointer' }} onClick={onChangeUserType}>
					{isUser ? '사업자로' : '유저로'}
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
