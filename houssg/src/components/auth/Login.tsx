import { useState } from 'react';
import styled from 'styled-components';

import { AuthContainer, AuthFindingBtn, AuthTitle, FinderRouteAligner } from '../../assets/styles';
import { kakaoLogin } from '../../assets/images';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { useAppDispatch } from '../../hooks';
import { authLoginFunc } from '../../helper';
import { KakaoAuthUri } from '../../api';
import { closeModal } from '../../store/redux/modalSlice';
import { AuthProps } from '../../types';

const Login: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');
	const onLogin = () => {
		authLoginFunc(userId, userPw, onCloseModal);
	};
	const onKakaoLogin = () => {
		location.href = KakaoAuthUri;
	};

	return (
		<AuthContainer>
			<AuthTitle>로그인</AuthTitle>
			<AuthInput setValue={setUserId} title="아이디" />
			<AuthInput setValue={setUserPw} title="비밀번호" password />
			<FinderRouteAligner>
				<AuthFindingBtn
					onClick={() => {
						setAuthStep('findId');
					}}
				>
					아이디 찾기
				</AuthFindingBtn>
				<AuthFindingBtn
					onClick={() => {
						setAuthStep('findPw');
					}}
				>
					비밀번호 찾기
				</AuthFindingBtn>
			</FinderRouteAligner>
			<AuthSubmitBtn onClick={onLogin}>로그인하기</AuthSubmitBtn>

			<KakaoLogin onClick={onKakaoLogin} src={kakaoLogin} />
			<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
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
