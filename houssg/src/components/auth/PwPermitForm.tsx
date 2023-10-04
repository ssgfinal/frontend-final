import { useState } from 'react';
import { CheckerContainer, FindInputAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput } from './element';
import { ProcessType, SetStateToggle } from '../../types';
import { regSignUp } from '../../assets/constant';
import { Timer } from '../common';

const PwPermitForm: React.FC<SetStateToggle> = ({ setState }) => {
	const [userId, setUserId] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const [time, setTime] = useState(0);

	return (
		<>
			<FindInputAligner>
				<AuthInput setValue={setUserId} title="아이디" />
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />

					<UseAbilitiyChecker
						onClick={() => {
							console.log(userPhone, userId);
							setTime(180);
							setTimeStatus('start');
						}}
					>
						인증하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<CheckerContainer>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						disabled={timeStatus === 'end'}
						onClick={() => {
							console.log(smsNumber);
							console.log('되나');
							setState(true);
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
