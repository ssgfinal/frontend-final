import styled from 'styled-components';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch } from '../hooks';
import { logo } from '../assets/icons';

const Header = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
	};
	return (
		<HeaderContainer>
			<img src={logo} height="70px" />
			<div onClick={modalOpen}>로그인</div>
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
