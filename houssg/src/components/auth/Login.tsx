import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle, HeightPositioningDiv } from '../../assets/styles';

import { kakaoLogin } from '../../assets/images';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { usePathname } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api/api';
import { url } from '../../assets/constant/urlConst';

const Login: React.FC<AuthProps> = ({ isLoginComp, setIsLoginComp }) => {
	const pathname = usePathname();
	const navigate = useNavigate();
	const isUser = pathname.startsWith('/user');

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	// console.log(1, userId, 2, userPw);

	const onLogin = () => {
		if (userId.trim() === '') {
			alert('아이디를 입력해주세요');
			return;
		}
		if (userPw.trim() === '') {
			alert('비밀번호를 입력해주세요');
			return;
		}
		if (isUser) {
			console.log('들어오나');
			api.post(url.login + `?id=${userId}&password=${userPw}&auth=0`).then((resp) => {
				alert(resp);

				// if (resp.data.id) {
				// 	localStorage.setItem('login', resp.data.id);
				// 	setUserId('');
				// 	setUserPw('');
				// } else {
				// 	alert('입력하신 정보가 틀렸습니다.');
				// 	setUserPw('');
				// }
			});
		}

		!isUser && navigate('/owner');
	};

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
