import styled from 'styled-components';
import { useAppDispatch } from '../hooks/useReduxToolkit';
import { openModal } from '../store/redux/modalSlice';
import { AuthWrap } from '../components/auth';

const Header = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		dispatch(openModal({ component: <AuthWrap />, modalSize: 300 }));
	};
	return (
		<HeaderContainer>
			<div>logo</div>
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
