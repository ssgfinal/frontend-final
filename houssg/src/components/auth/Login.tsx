import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle, HeightPositioningDiv } from '../../assets/styles';

import { kakaoLogin } from '../../assets/images';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { usePathname } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authLoginFunc } from '../../utils';

const Login: React.FC<AuthProps> = ({ isLoginComp, setIsLoginComp }) => {
	const pathname = usePathname();
	const navigate = useNavigate();

	const isUser = pathname.startsWith('/user');

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	const onLogin = () => authLoginFunc(userId, userPw, isUser, navigate);

	return (
		<AuthContainer>
			<AuthTitle>{isUser ? '로그인' : '사업자 로그인'}</AuthTitle>
			<AuthInput setValue={setUserId} title="아이디" />
			<AuthInput setValue={setUserPw} title="비밀번호" password />
			<AuthSubmitBtn onClick={onLogin}>로그인하기</AuthSubmitBtn>
			<HeightPositioningDiv height="0.2rem" />
			<img src={kakaoLogin} width="45%" />
			<HeightPositioningDiv height="1.3rem" />
			<AuthModeBtn isLoginComp={isLoginComp} setIsLoginComp={setIsLoginComp}>
				회원가입으로
			</AuthModeBtn>
		</AuthContainer>
	);
};

export default Login;
