import { useState, useEffect } from 'react';
import { regSignUp } from '../../assets/constant';
import { FindInputAligner, color } from '../../assets/styles';
import { NewPwProps } from '../../types';
import { AuthInput } from './element';
import { onUpdateNewPw } from '../../helper/authFunction';
import styled from 'styled-components';

const PwChangeForm: React.FC<NewPwProps> = ({ userId, setAuthStep }) => {
	const [newPw, setNewPw] = useState('');
	const [newPwCheck, setNewPwCheck] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [disable, setIsdisable] = useState(true);

	useEffect(() => {
		if (newPw.trim() === '' || !regSignUp.regPw.reg.test(newPw)) {
			setIsdisable(true);
			return;
		}

		if (newPwCheck.trim() === '') {
			setIsdisable(true);
			return;
		}

		if (newPw !== newPwCheck) {
			setIsdisable(true);
			return;
		}

		setIsdisable(false);
	}, [newPw, newPwCheck]);

	const changeNewPw = () => {
		onUpdateNewPw(userId, newPw, setAuthStep, setIsLoading);
	};
	return (
		<>
			<FindInputAligner>
				<AuthInput setValue={setNewPw} title="비밀번호" password reg={regSignUp.regPw} />
				<AuthInput setValue={setNewPwCheck} password title="비밀번호확인" />
				<SubmitBtnContainer $disabled={disable} $loading={isLoading} onClick={changeNewPw}>
					변경하기
				</SubmitBtnContainer>
			</FindInputAligner>
		</>
	);
};

export default PwChangeForm;

const SubmitBtnContainer = styled.div<{ $disabled: boolean; $loading: boolean }>`
	width: 60%;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.3rem 0;
	color: ${color.color2};
	font-size: 1rem;
	font-weight: 700;
	transition: font-size 0.2s;
	cursor: pointer;
	cursor: ${(props) => props.$disabled && 'not-allowed'};
	cursor: ${(props) => props.$loading && 'wait'};
	&:hover {
		font-size: 1.2rem;
	}
`;
