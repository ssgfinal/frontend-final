import styled from 'styled-components';

import { FindId, FindPw, Login, SignUp } from '.';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { isModalOpen } from '../../store/redux/modalSlice';

const AuthWrap = () => {
	const [authStep, setAuthStep] = useState<string>('login');
	const modalState = useAppSelector(isModalOpen);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAuthStep('login');
		}, 200);

		return () => clearTimeout(timer);
	}, [modalState]);

	return (
		<AuthWrapper>
			{authStep === 'login' && <Login authStep={authStep} setAuthStep={setAuthStep} />}
			{authStep === 'signUp' && <SignUp authStep={authStep} setAuthStep={setAuthStep} />}
			{authStep === 'findId' && <FindId authStep={authStep} setAuthStep={setAuthStep} />}
			{authStep === 'findPw' && <FindPw authStep={authStep} setAuthStep={setAuthStep} />}
		</AuthWrapper>
	);
};

export default AuthWrap;

const AuthWrapper = styled.div`
	min-height: 400px;
	width: 100%;
	display: flex;
	justify-content: center;
`;
