import { useState } from 'react';
import { CheckerContainer, FindInputAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput } from './element';
import { SetStateToggle } from '../../types';
import { regSignUp } from '../../assets/constant';
import { Timer } from '../common';

const PwPermitForm: React.FC<SetStateToggle> = ({ setState }) => {
	const [userId, setUserId] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	const [timeEnd, setTimeEnd] = useState(true);

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
							setTimeEnd(false);
							setTime(90);
						}}
					>
						인증하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<CheckerContainer>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						disabled={timeEnd}
						onClick={() => {
							console.log(smsNumber);
							console.log('되나');
							setState(true);
						}}
					>
						확인하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				{!!time && <Timer time={time} setTimeEnd={setTimeEnd} />}
			</FindInputAligner>
		</>
	);
};

export default PwPermitForm;
