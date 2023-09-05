import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

import { AuthContainer, AuthTitle } from '../../assets/styles';
import { kakaoLogin } from '../../assets/images';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { useAppDispatch, usePathname } from '../../hooks';
import { authLoginFunc } from '../../utils';
import { KakaoAuthUri } from '../../api';
import { closeModal } from '../../store/redux/modalSlice';
import { AuthProps } from '../../types';

const Login: React.FC<AuthProps> = ({ isLoginComp, setIsLoginComp }) => {
	const pathname = usePathname();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onCloseModal = () => {
		dispatch(closeModal());
	};

	const isUser = pathname.startsWith('/user');

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	const onLogin = () => authLoginFunc(userId, userPw, isUser, navigate, onCloseModal);

	const onKakaoLogin = () => {
		location.href = KakaoAuthUri;
	};

	return (
		<AuthContainer>
			<AuthTitle>{isUser ? '로그인' : '사업자 로그인'}</AuthTitle>
			<AuthInput setValue={setUserId} title="아이디" />
			<AuthInput setValue={setUserPw} title="비밀번호" password />
			<AuthSubmitBtn onClick={onLogin}>로그인하기</AuthSubmitBtn>
			<KakaoLogin onClick={onKakaoLogin} src={kakaoLogin} />
			<AuthModeBtn isLoginComp={isLoginComp} setIsLoginComp={setIsLoginComp}>
				회원가입으로
			</AuthModeBtn>
		</AuthContainer>
	);
};

export default Login;

const KakaoLogin = styled.img`
	margin: 0.5rem 0 1.3rem 0;
	width: 45%;
	cursor: pointer;
`;
