import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { useRef, useState } from 'react';
import { Timer } from '../common';
import { ProcessType } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setNewPhoneNumber } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';

interface MyChangePhone {
	newPhone: string;
	smsPhone?: string;
}

const EditPhoneNumber = () => {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState(false);
	//TODO: 조건 확인하기(아래쪽)
	const [timeStatus, setTimeStatus] = useState<ProcessType>('start');
	//const [status, setStatus] = useState(false);
	const phoneNumber = useRef<HTMLInputElement | null>(null);
	const authentication = useRef<HTMLInputElement | null>(null);
	// const [authorization, setAuthorization] = useState(false);

	const queryClient = useQueryClient();

	// TODO: 문자전송 요청 > mutate를 또 선언할 수 없다..!!컴퍼넌트 분리가 답인가?
	// 콘솔에는 400 error, 스웨거에는 401 error?
	const { mutate } = useMutation({
		mutationFn: ({ newPhone }: MyChangePhone) => setNewPhoneNumber(newPhone),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myPhoneNum] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// 전화번호&인증번호 확인
	// const { mutate } = useMutation({
	// 	mutationFn: ({ newPhone, smsPhone }: MyChangePhone) => {
	// 		if (smsPhone !== undefined) {
	// 			return smsMyPhoneAuth(newPhone, smsPhone);
	// 		} else {
	// 			throw new Error('smsPhone is undefined');
	// 		}
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: [userKey.smsMyPhone] });
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	// 문자전송 요청
	const onAuthentication = () => {
		const newPhone = phoneNumber.current?.value;
		if (phoneNumber.current) {
			if (newPhone) {
				mutate({ newPhone });
			}
		}

		setMessage(true);
		setTimeStatus('start');
	};

	// 전화번호&인증번호 확인
	const onEditPhoneNumber = () => {
		const newPhone = phoneNumber.current?.value;
		const smsPhone = authentication.current?.value;
		if (phoneNumber.current) {
			if (newPhone && smsPhone !== undefined) {
				mutate({ newPhone, smsPhone });
			}
		}

		// TODO: 전화번호 변경
		if (authentication.current) {
			phoneNumber.current!.value = '';
			authentication.current.value = '';
			setMessage(false);
			setTimeStatus('start');
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
			<PhoneNumberInput type="number" ref={authentication} disabled={timeStatus === 'start'} />
			{/* <PhoneNumberInput type="number" ref={authentication} disabled={timeStatus === 'start' || authorization} /> */}
			<EditPhoneNumberButton disabled={timeStatus === 'start'} onClick={onEditPhoneNumber}>
				변경
			</EditPhoneNumberButton>
			<Message>{message ? <Timer time={90} timeStatus={timeStatus} setTimeStatus={setTimeStatus} /> : null}</Message>
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
