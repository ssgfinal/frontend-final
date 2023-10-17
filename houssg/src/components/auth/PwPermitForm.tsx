import { useState } from 'react';
import { CheckerContainer, FindInputAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput } from './element';
import { FindPwPermitProps, ProcessType } from '../../types';
import { regSignUp } from '../../assets/constant';
import { Timer } from '../common';
import { onFindPw, phoneAuthCheck } from '../../helper/authFunction';

const PwPermitForm: React.FC<FindPwPermitProps> = ({ setState, setPermittedUserId }) => {
	const [userId, setUserId] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const [time, setTime] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const onClickFindPw = () => {
		if (!regSignUp.regPhone.reg.test(userPhone)) {
			return;
		}

		!isLoading && timeStatus !== 'restricted'
			? onFindPw(userId, userPhone, setIsLoading, setTimeStatus, setTime)
			: alert('재시도는 요청 후 10초가 지나야 합니다.');
	};

	const onSetPermittedUserId = () => {
		setPermittedUserId(userId);
	};

	return (
		<>
			<FindInputAligner>
				<AuthInput setValue={setUserId} title="아이디" />
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />

					<UseAbilitiyChecker onClick={onClickFindPw}>인증하기</UseAbilitiyChecker>
				</CheckerContainer>
				<CheckerContainer>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						disabled={timeStatus === 'end'}
						onClick={() => {
							!isLoading && phoneAuthCheck(smsNumber, userPhone, setIsLoading, setState, onSetPermittedUserId);
						}}
					>
						확인하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				{!!time && <Timer time={time} setTimeStatus={setTimeStatus} timeStatus={timeStatus} />}
			</FindInputAligner>
		</>
	);
};

export default PwPermitForm;
