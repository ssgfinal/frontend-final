import { useState } from 'react';
import { CheckerContainer, FindInputAligner, FinderRouteAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput, AuthModeBtn } from './element';
import { AuthPropsWithState } from '../../types';
import { regSignUp } from '../../assets/constant';

const PwPermitForm: React.FC<AuthPropsWithState> = ({ authStep, setAuthStep, setState }) => {
	const [userId, setUserId] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	return (
		<>
			<FindInputAligner>
				<AuthInput setValue={setUserId} title="아이디" />
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />

					<UseAbilitiyChecker
						onClick={() => {
							console.log(userPhone, userId);
						}}
					>
						인증하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<CheckerContainer>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						onClick={() => {
							console.log(smsNumber);
							console.log('되나');
							setState(true);
						}}
					>
						확인하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<div>남은시간 : 03:00</div>
			</FindInputAligner>

			<FinderRouteAligner>
				<AuthModeBtn authStep={'tofindId'} setAuthStep={setAuthStep}>
					아이디 찾기
				</AuthModeBtn>
				<AuthModeBtn authStep={authStep} setAuthStep={setAuthStep}>
					로그인으로
				</AuthModeBtn>
			</FinderRouteAligner>
		</>
	);
};

export default PwPermitForm;
