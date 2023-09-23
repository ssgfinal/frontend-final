import { useState } from 'react';
import { AuthContainer, AuthTitle, CheckerContainer, FindInputAligner, FinderRouteAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthProps } from '../../types';
import { AuthInput, AuthModeBtn } from './element';
import { regSignUp } from '../../assets/constant';

const FindId: React.FC<AuthProps> = ({ authStep, setAuthStep }) => {
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	return (
		<AuthContainer>
			<AuthTitle>아이디 찾기</AuthTitle>
			<FindInputAligner>
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />
					<UseAbilitiyChecker
						onClick={() => {
							console.log(userPhone);
						}}
					>
						인증하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<br />
				<CheckerContainer>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						onClick={() => {
							console.log(smsNumber);
							console.log(userPhone);
						}}
					>
						확인하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<div>남은시간 : 03:00</div>
			</FindInputAligner>

			<FinderRouteAligner>
				<AuthModeBtn authStep={'tofindPw'} setAuthStep={setAuthStep}>
					비밀번호 찾기
				</AuthModeBtn>
				<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
					로그인으로
				</AuthModeBtn>
			</FinderRouteAligner>
		</AuthContainer>
	);
};

export default FindId;
