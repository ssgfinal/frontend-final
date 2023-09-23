import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch, useIsUser } from '../hooks';
import { login, logo } from '../assets/icons';

const Header = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
	};
	const navigate = useNavigate();
	const isUser = useIsUser();
	const goHomeHandler = () => {
		isUser ? navigate('/') : navigate('/owner');
	};

	const onChangeUserType = () => {};

	return (
		<HeaderContainer>
			<LogoImg onClick={goHomeHandler} src={logo} />
			<RightIconContainer>
				{isUser ? <div onClick={onChangeUserType}>사업자로</div> : <div onClick={onChangeUserType}>유저로</div>}
				<LoginImg onClick={modalOpen} src={login} />
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
