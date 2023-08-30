import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch, useIsUser, usePathname } from '../hooks';
import { login, logo } from '../assets/icons';

const Header = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
	};
	const navigate = useNavigate();
	const pathname = usePathname();
	const isUser = useIsUser();

	const goHomeHandler = () => {
		pathname === '/user' || pathname === '/owner' ? navigate('/') : isUser ? navigate('/user') : navigate('/owner');
	};

	return (
		<HeaderContainer>
			<LogoImg onClick={goHomeHandler} src={logo} />
			{isUser ?? <LoginImg onClick={modalOpen} src={login} />}
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
