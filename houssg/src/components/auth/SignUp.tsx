import { AuthContainer, AuthTitle, CheckerContainer, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { useState } from 'react';
import { regSignUp } from '../../assets/constant';
import { authSignUpFunc, idCheckFunc, nickCheckFunc, onPhoneUsableCheck, phoneAuthCheck } from '../../helper';
import { AuthProps } from '../../types';
import { Timer } from '../common';

const SignUp: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const [userId, setUserId] = useState('');
	const [userNick, setUserNick] = useState('');
	const [userPw, setUserPw] = useState('');
	const [userPwCheck, setUserPwCheck] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [verification, setVerification] = useState('');
	const [timeEnd, setTimeEnd] = useState(true);
	const { regId, regPw, regNick, regPhone } = regSignUp;

	const onSignUp = () => {
		authSignUpFunc(userId, userNick, userPw, userPwCheck, userPhone, setAuthStep);
	};

	const onIdCheck = () => {
		idCheckFunc(userId);
	};

	const onNickCheck = () => {
		nickCheckFunc(userNick);
	};

	const onPhoneCheck = () => {
		onPhoneUsableCheck(userPhone);
	};

	const onPhoneAuthCheck = () => {
		phoneAuthCheck(verification);
	};
	return (
		<AuthContainer>
			<AuthTitle>회원가입</AuthTitle>
			<CheckerContainer>
				<AuthInput setValue={setUserId} title="아이디" reg={regId} />
				<UseAbilitiyChecker onClick={onIdCheck}>본인확인</UseAbilitiyChecker>
			</CheckerContainer>
			<CheckerContainer>
				<AuthInput setValue={setUserNick} title="닉네임" reg={regNick} />
				<UseAbilitiyChecker onClick={onNickCheck}>중복확인</UseAbilitiyChecker>
			</CheckerContainer>
			<AuthInput setValue={setUserPw} title="비밀번호" password reg={regPw} />
			<AuthInput setValue={setUserPwCheck} title="비밀번호확인" password />
			<CheckerContainer>
				<AuthInput setValue={setUserPhone} title="전화번호" reg={regPhone} />
				<UseAbilitiyChecker onClick={onPhoneCheck}>인증하기</UseAbilitiyChecker>
			</CheckerContainer>
			<CheckerContainer>
				<AuthInput setValue={setVerification} title="인증번호" />
				<UseAbilitiyChecker onClick={onPhoneAuthCheck} disabled={timeEnd}>
					인증하기
				</UseAbilitiyChecker>
			</CheckerContainer>
			<Timer time={90} setTimeEnd={setTimeEnd} /> <AuthSubmitBtn onClick={onSignUp}>회원가입하기</AuthSubmitBtn>
			<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
				로그인으로
			</AuthModeBtn>
		</AuthContainer>
	);
};

export default SignUp;
