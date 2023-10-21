import { useState } from 'react';
import styled from 'styled-components';
import { AuthContainer, AuthTitle, CheckerContainer, UseAbilitiyChecker, color } from '../../assets/styles';
import { AuthInput, AuthSubmitBtn } from './element';
import { ProcessType } from '../../types';
import { regSignUp } from '../../assets/constant';
import { nickCheckFunc, onPhoneUsableCheck, phoneAuthCheck } from '../../helper';
import { Timer } from '../common';

const KaKaoSignUp = () => {
	const [userPhone, setUserPhone] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [time, setTime] = useState(0);
	const [confirmed, setConfirmed] = useState(false);
	const [userNick, setUserNick] = useState('');
	const { regNick, regPhone } = regSignUp;
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const [isLoading, setIsLoading] = useState(false);

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
		// authSignUpFunc(userId, userNick, userPw, userPwCheck, userPhone, dispatch, __postSignUp);
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
			</Container>
			<AuthSubmitBtn onClick={onKaKaoSignUp} disabled={!confirmed}>
				회원가입하기
			</AuthSubmitBtn>
		</AuthContainer>
	);
};

export default KaKaoSignUp;

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

const Container = styled.div`
	width: 100%;
	margin-block: 1rem;
`;
