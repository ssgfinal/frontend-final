import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContainer, AuthTitle, CheckerContainer, UseAbilitiyChecker, color } from '../../assets/styles';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { regSignUp } from '../../assets/constant';
import { authSignUpFunc, idCheckFunc, nickCheckFunc, onPhoneUsableCheck, phoneAuthCheck } from '../../helper';
import { AuthProps, ProcessType } from '../../types';
import { Timer } from '../common';
import { __postSignUp, authStatus, resetAuthStatus } from '../../store/redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const SignUp: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(authStatus);
	const [userId, setUserId] = useState('');
	const [userNick, setUserNick] = useState('');
	const [userPw, setUserPw] = useState('');
	const [userPwCheck, setUserPwCheck] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const { regId, regPw, regNick, regPhone } = regSignUp;
	const [time, setTime] = useState(0);
	const [confirmed, setConfirmed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSignUp = () => {
		authSignUpFunc(userId, userNick, userPw, userPwCheck, userPhone, dispatch, __postSignUp);
	};

	const onIdCheck = () => {
		!isLoading && idCheckFunc(userId, setIsLoading);
	};

	const onNickCheck = () => {
		!isLoading && nickCheckFunc(userNick, setIsLoading);
	};

	const onPhoneCheck = () => {
		if (!isLoading) {
			setTimeStatus('start');
			setTime(180);
			onPhoneUsableCheck(userPhone, setIsLoading);
		}
	};

	const onPhoneAuthCheck = () => {
		if (!isLoading) {
			setConfirmed(true);
			phoneAuthCheck(verificationCode, setIsLoading);
		}
	};

	useEffect(() => {
		setConfirmed(false);
		setTime(0);
	}, [userPhone]);

	useEffect(() => {
		status === 'success' && setAuthStep('login');
		resetAuthStatus();
	}, [status, setAuthStep]);

	return (
		<AuthContainer $pending={isLoading}>
			<AuthTitle>회원가입</AuthTitle>
			<CheckerContainer>
				<AuthInput setValue={setUserId} title="아이디" reg={regId} />
				<UseAbilitiyChecker onClick={onIdCheck}>중복확인</UseAbilitiyChecker>
			</CheckerContainer>
			<CheckerContainer>
				<AuthInput setValue={setUserNick} title="닉네임" reg={regNick} />
				<UseAbilitiyChecker onClick={onNickCheck}>중복확인</UseAbilitiyChecker>
			</CheckerContainer>
			<AuthInput setValue={setUserPw} title="비밀번호" password reg={regPw} />
			<AuthInput setValue={setUserPwCheck} title="비밀번호확인" password />
			{!confirmed ? (
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regPhone} />
					<UseAbilitiyChecker onClick={onPhoneCheck}>인증하기</UseAbilitiyChecker>
				</CheckerContainer>
			) : (
				<VerifiedPhoneNumberContainer>
					<VerifiedTitle>전화번호</VerifiedTitle>
					<VerifiedPhoneNumber>{userPhone}</VerifiedPhoneNumber>
				</VerifiedPhoneNumberContainer>
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
			<AuthSubmitBtn onClick={onSignUp} disabled={!confirmed}>
				회원가입하기
			</AuthSubmitBtn>
			<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
				로그인으로
			</AuthModeBtn>
		</AuthContainer>
	);
};

export default SignUp;

const VerifiedPhoneNumberContainer = styled.div`
	width: 80%;
	padding-inline: 0.5rem;
	padding-bottom: 0.5rem;
	height: 4.5rem;

	@media screen and (max-width: 1000px) {
		width: 90%;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

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
