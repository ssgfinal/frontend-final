import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { useRef, useState } from 'react';
import Timer from './Timer';

const EditPhoneNumber = () => {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState(false);
	//const [status, setStatus] = useState(false);
	const phoneNumber = useRef<HTMLInputElement | null>(null);
	const authentication = useRef<HTMLInputElement | null>(null);

	const onAuthentication = () => {
		// TODO : 문자전송 요청
		if (phoneNumber.current) {
			console.log(phoneNumber.current.value);
		}

		// TODO : 문자전송완료 status?를 받으면 3분 타이머 실행
		// TODO : 시간연장없이 다시 재발급으로
		// TODO : 재발급 시 3분 타이머도 리셋, 변경 누른 후도 리셋
		setMessage(true);
	};

	const onEditPhoneNumber = () => {
		// TODO : 전화번호 변경
		if (authentication.current) {
			phoneNumber.current!.value = '';
			authentication.current.value = '';
			dispatch(closeModal());
		}
	};
	return (
		<EditPhoneNumberWrapper>
			<PhoneNumberTitle>전화번호 입력</PhoneNumberTitle>
			<PhoneNumberInput type="number" ref={phoneNumber} placeholder="예시) 01012345678" />
			<EditPhoneNumberButton onClick={onAuthentication}>인증</EditPhoneNumberButton>
			<Space></Space>
			<PhoneNumberTitle>인증번호 입력</PhoneNumberTitle>
			<PhoneNumberInput type="number" ref={authentication} />
			<EditPhoneNumberButton onClick={onEditPhoneNumber}>변경</EditPhoneNumberButton>
			<Message>{message ? <Timer /> : null}</Message>
		</EditPhoneNumberWrapper>
	);
};

export default EditPhoneNumber;

const EditPhoneNumberWrapper = styled.div`
	margin: 3vw 3vw 3vw 3vw;
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-gap: 1rem;
	width: 100%;

	@media (max-width: 450px) {
		grid-template-columns: 1fr;
	}
`;

const Space = styled.div`
	margin: 0;
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
	width: 100%;
	height: 2rem;
	justify-items: center;
	align-self: center;
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	font-size: 0.8rem;
	text-align: center;

	@media (max-width: 450px) {
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;

const EditPhoneNumberButton = styled.button`
	grid-column-start: 2;
	grid-column-end: 3;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	width: 80px;
	height: 30px;
	justify-self: center;
	align-self: center;

	@media (max-width: 450px) {
		justify-self: center;
		grid-column-start: 1;
		grid-column-end: 3;
	}

	&:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;

const Message = styled.div`
	color: ${color.red};
	font-size: 0.8rem;
	justify-self: center;
	align-self: center;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 4;
	grid-row-end: 5;

	@media (max-width: 450px) {
		grid-row-start: 5;
		grid-row-end: 6;
	}
`;
