import { useState } from 'react';
import { regSignUp } from '../../assets/constant';
import { FindInputAligner } from '../../assets/styles';
import { AuthProps } from '../../types';
import { AuthInput } from './element';

const PwChangeForm: React.FC<AuthProps> = ({ setAuthStep }) => {
	const [newPw, setNewPw] = useState('');
	const [newPwCheck, setNewPwCheck] = useState('');

	const changeNewPw = () => {
		console.log(newPw, newPwCheck);
		setAuthStep('login');
	};
	return (
		<>
			<FindInputAligner>
				<AuthInput setValue={setNewPw} title="비밀번호" password reg={regSignUp.regPw} />

				<AuthInput setValue={setNewPwCheck} password title="비밀번호확인" />
				<div onClick={changeNewPw}>변경하기</div>
			</FindInputAligner>
		</>
	);
};

export default PwChangeForm;
