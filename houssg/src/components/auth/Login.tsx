import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AuthContainer, AuthFindingBtn, AuthTitle, FinderRouteAligner } from '../../assets/styles';
import { kakaoLogin } from '../../assets/images';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { KakaoAuthUri } from '../../api';
import { closeModal, isModalOpen } from '../../store/redux/modalSlice';
import { AuthProps } from '../../types';
import { __postLogin, authStatus, isLoginState, resetAuthStatus } from '../../store/redux/authSlice';
import { authLoginFunc } from '../../helper';

const Login: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(authStatus);
	const isLogin = useAppSelector(isLoginState);
	const modalState = useAppSelector(isModalOpen);

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	const onKakaoLogin = () => {
		location.href = KakaoAuthUri;
	};

	const onLogin = () => {
		authLoginFunc(userId, userPw, dispatch, __postLogin);
	};

	useEffect(() => {
		// 로그인 성공시 모달 닫기
		if (status === 'success' || isLogin) {
			dispatch(closeModal());
			resetAuthStatus();
		}
	}, [dispatch, status, isLogin]);

	return (
		<AuthContainer>
			<AuthTitle>로그인</AuthTitle>
			{/* 성공시 언마운트하기 */}
			{modalState && (
				<>
					<AuthInput setValue={setUserId} title="아이디" />
					<AuthInput setValue={setUserPw} title="비밀번호" password />
				</>
			)}
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
			<AuthSubmitBtn onClick={onLogin} pending={status === 'loading'}>
				로그인하기
			</AuthSubmitBtn>

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
