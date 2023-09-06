import React from 'react';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { AuthModeType } from '../../../types';

const AuthModeBtn: React.FC<AuthModeType> = ({ children, isLoginComp, setIsLoginComp }) => {
	return (
		<AuthModeBtnContainer>
			<HoverText onClick={() => setIsLoginComp(!isLoginComp)}>{children}</HoverText>
		</AuthModeBtnContainer>
	);
};

export default AuthModeBtn;

const AuthModeBtnContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HoverText = styled.div`
	color: ${color.color4};
	font-size: 0.8rem;
	font-weight: 600;
	transition: font-size 0.2s;

	cursor: pointer;

	&:hover {
		font-size: 0.9rem;
	}
`;
