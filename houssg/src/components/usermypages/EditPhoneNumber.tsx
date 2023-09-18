import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { useState } from 'react';

const EditPhoneNumber = () => {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState('');

	const onAuthentication = () => {
		// TODO : 문자전송
		alert('문자전송 해주세요~~');
		setMessage('3분 타이머');
	};

	const onEditPhoneNumber = () => {
		// TODO : 전화번호 변경
		dispatch(closeModal());
	};
	return (
		<EditPhoneNumberWrapper>
			<PhoneNumberTitle>전화번호 입력</PhoneNumberTitle>
			<PhoneNumberInput type="number" />
			<EditPhoneNumberButton onClick={onAuthentication}>인증</EditPhoneNumberButton>
			<PhoneNumberTitle>인증번호 입력</PhoneNumberTitle>
			<PhoneNumberInput type="number" />
			<EditPhoneNumberButton onClick={onEditPhoneNumber}>변경</EditPhoneNumberButton>
			{message ? <Message>{message}</Message> : null}
		</EditPhoneNumberWrapper>
	);
};

export default EditPhoneNumber;

const EditPhoneNumberWrapper = styled.div`
	margin: 3vw 3vw 3vw 3vw;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	width: 100%;
`;

const PhoneNumberTitle = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	margin: 0 0 1vw 0;
	color: ${color.color1};
	font-weight: bold;
`;

const PhoneNumberInput = styled.input`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	grid-column-start: 1;
	grid-column-end: 2;
	max-width: 230px;
	height: 2rem;
	align-self: center;
	margin-bottom: 1vw;
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	font-size: 1.5rem;
	text-align: center;
`;

const EditPhoneNumberButton = styled.button`
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	width: 80px;
	height: 30px;

	justify-self: center;
	align-self: center;

	&:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;

const Message = styled.div`
	color: red;
	font-size: 0.5rem;
`;
