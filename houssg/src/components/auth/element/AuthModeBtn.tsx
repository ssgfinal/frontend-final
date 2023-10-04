import React from 'react';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { AuthModeType } from '../../../types';
import { resetAuthStatus } from '../../../store/redux/authSlice';

const AuthModeBtn: React.FC<AuthModeType> = ({ children, authStep, setAuthStep }) => {
	const nextStep = authStep === 'login' ? 'signUp' : authStep.startsWith('to') ? authStep.substring(2) : 'login';
	return (
		<AuthModeBtnContainer>
			<HoverText
				onClick={() => {
					setAuthStep(nextStep);
					resetAuthStatus();
				}}
			>
				{children}
			</HoverText>
		</AuthModeBtnContainer>
	);
};

export default AuthModeBtn;

const AuthModeBtnContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 1rem;
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
