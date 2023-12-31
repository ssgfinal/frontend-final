import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContainer, AuthTitle, CheckerContainer, UseAbilitiyChecker, color } from '../../assets/styles';
import { AuthInput, AuthSubmitBtn } from './element';
import { ProcessType } from '../../types';
import { regSignUp } from '../../assets/constant';
import { nickCheckFunc, onPhoneUsableCheck, phoneAuthCheck } from '../../helper';
import { Timer } from '../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { __postKaKaoSignUp, isLoginState, resetAuthStatus } from '../../store/redux/authSlice';
import { closeModal } from '../../store/redux/modalSlice';

const KaKaoSignUp = () => {
	const dispatch = useAppDispatch();
	const [userPhone, setUserPhone] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [time, setTime] = useState(0);
	const [confirmed, setConfirmed] = useState(false);
	const [userNick, setUserNick] = useState('');
	const { regNick, regPhone } = regSignUp;
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const [isLoading, setIsLoading] = useState(false);
	const isLogin = useAppSelector(isLoginState);
	useEffect(() => {
		isLogin && dispatch(closeModal());
		return () => {
			isLogin && dispatch(resetAuthStatus());
		};
	}, [dispatch, isLogin]);
	const onNickCheck = () => {
		!isLoading && nickCheckFunc(userNick, setIsLoading);
	};

	const onPhoneCheck = () => {
		!isLoading && timeStatus !== 'restricted'
			? onPhoneUsableCheck(userPhone, setIsLoading, setTimeStatus, setTime)
			: alert('재시도는 요청 후 10초가 지나야 합니다.');
	};

	const onPhoneAuthCheck = () => {
		if (!isLoading) {
			phoneAuthCheck(verificationCode, userPhone, setIsLoading, setConfirmed);
		}
	};

	const onKaKaoSignUp = () => {
		if (!regNick.reg.test(userNick)) {
			return;
		}
		dispatch(__postKaKaoSignUp({ phonenumber: userPhone, nickname: userNick }));
	};

	return (
		<AuthContainer $pending={isLoading}>
			<AuthTitle> 카카오 회원가입</AuthTitle>
			<Container>
				<CheckerContainer>
					<AuthInput setValue={setUserNick} title="닉네임" reg={regNick} />
					<UseAbilitiyChecker onClick={onNickCheck}>중복확인</UseAbilitiyChecker>
				</CheckerContainer>
				{!confirmed ? (
					<CheckerContainer>
						<AuthInput setValue={setUserPhone} title="전화번호" reg={regPhone} />
						<UseAbilitiyChecker onClick={onPhoneCheck}>인증하기</UseAbilitiyChecker>
					</CheckerContainer>
				) : (
					<CheckerContainer>
						<VerifiedTitle>전화번호</VerifiedTitle>
						<VerifiedPhoneNumber>{userPhone}</VerifiedPhoneNumber>
					</CheckerContainer>
				)}
				{!!time && !confirmed && (
					<>
						<CheckerContainer>
							<AuthInput setValue={setVerificationCode} title="인증번호" />
							<UseAbilitiyChecker onClick={onPhoneAuthCheck} disabled={timeStatus === 'end'}>
								인증하기
							</UseAbilitiyChecker>
						</CheckerContainer>
						<Timer time={time} setTimeStatus={setTimeStatus} timeStatus={timeStatus} />
					</>
				)}
			</Container>
			<AuthSubmitBtn onClick={onKaKaoSignUp} disabled={!confirmed}>
				회원가입하기
			</AuthSubmitBtn>
		</AuthContainer>
	);
};

export default KaKaoSignUp;

const VerifiedTitle = styled.div`
	font-size: 1rem;
	font-weight: 700;
	margin-bottom: 0.3rem;
	text-align: start;
`;

const VerifiedPhoneNumber = styled.div`
	width: 100%;
	font-size: 0.9rem;
	border: 1px solid ${color.basicColor};
	border-radius: 5px;
	height: 2.2rem;
	padding-left: 0.3rem;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	width: 100%;
	margin-block: 1rem;
`;
