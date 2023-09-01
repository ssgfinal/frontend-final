import styled from 'styled-components';

import { Login, SignUp } from '.';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { isModalOpen } from '../../store/redux/modalSlice';

const AuthWrap = () => {
	const [isLoginComp, setIsLoginComp] = useState(true);
	const modalState = useAppSelector(isModalOpen);

	useEffect(() => {
		setIsLoginComp(true);
	}, [modalState]);
	return (
		<AuthWrapper>
			{isLoginComp ? (
				<Login isLoginComp={isLoginComp} setIsLoginComp={setIsLoginComp} />
			) : (
				<SignUp isLoginComp={isLoginComp} setIsLoginComp={setIsLoginComp} />
			)}
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
