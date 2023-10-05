import { useState } from 'react';
import { CheckerContainer, FindInputAligner, UseAbilitiyChecker } from '../../assets/styles';
import { AuthInput } from './element';
import { onFindId } from '../../helper';
import { Timer } from '../common';
import { regSignUp } from '../../assets/constant';
import { IdFindingType, ProcessType } from '../../types';
import { onFindIdCheck } from '../../helper/authFunction';

const IdFinding: React.FC<IdFindingType> = ({ setState, setFoundId }) => {
	const [userPhone, setUserPhone] = useState('');
	const [smsNumber, setSmsNumber] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	const [time, setTime] = useState(0);

	const onClickFindId = () => {
		!isLoading && timeStatus !== 'restricted'
			? onFindId(userPhone, setIsLoading, setTimeStatus, setTime)
			: alert('재시도는 요청 후 10초가 지나야 합니다.');
	};
	return (
		<>
			<FindInputAligner>
				<CheckerContainer $pending={isLoading}>
					<AuthInput setValue={setUserPhone} title="전화번호" reg={regSignUp.regPhone} />
					<UseAbilitiyChecker
						onClick={() => {
							onClickFindId;
						}}
					>
						인증하기
					</UseAbilitiyChecker>
				</CheckerContainer>
				<CheckerContainer $pending={isLoading}>
					<AuthInput setValue={setSmsNumber} title="인증번호" />
					<UseAbilitiyChecker
						disabled={timeStatus === 'end'}
						onClick={() => {
							!isLoading && onFindIdCheck(smsNumber, userPhone, setIsLoading, setState, setFoundId);
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

export default IdFinding;
