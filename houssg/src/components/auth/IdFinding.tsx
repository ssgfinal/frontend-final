import { useState } from 'react';
import { CheckerContainer, FindInputAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput } from './element';
import { onFindId } from '../../helper';
import { Timer } from '../common';
import { regSignUp } from '../../assets/constant';
import { IdFindingType } from '../../types';

const IdFinding: React.FC<IdFindingType> = ({ setState, setFoundId }) => {
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	const [timeEnd, setTimeEnd] = useState(true);
	const [time, setTime] = useState(0);
	return (
		<>
			<FindInputAligner>
				<CheckerContainer>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />
					<UseAbilitiyChecker
						onClick={() => {
							onFindId(userPhone);
							// TODO:수정
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
							setState(true);
							setFoundId('찾은 아이디');
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

export default IdFinding;
