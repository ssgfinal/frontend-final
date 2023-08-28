import React from 'react';
import styled from 'styled-components';
import Login from '../components/auth/Login';

interface ModalOpener {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setModalChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const Header: React.FC<ModalOpener> = ({ setIsModalOpen, setModalChildren }) => {
	return (
		<HeaderContainer>
			<div>logo</div>
			<div
				onClick={() => {
					setIsModalOpen(true);
					setModalChildren(<Login />);
				}}
			>
				로그인
			</div>
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
