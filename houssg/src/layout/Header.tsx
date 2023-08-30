import styled from 'styled-components';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch } from '../hooks';
import { login, logo } from '../assets/icons';

const Header = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
	};
	return (
		<HeaderContainer>
			<img src={logo} height="70px" />
			<LoginImg onClick={modalOpen} src={login} />
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

const LoginImg = styled.img`
	height: 3.2rem;
	cursor: pointer;
	padding-bottom: 0.5rem;
`;
