import styled from 'styled-components';
import { color } from '../../assets/styles';
import { closeModal, modalText } from '../../store/redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CancelReservationType } from '../../types';
import { userCancelReservation } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';
import { AxiosError } from 'axios';

const CancelReservation = () => {
	const dispatch = useAppDispatch();

	const reservationNumber = Number(useAppSelector(modalText));

	const [bank, setBank] = useState('');
	const [account, setAccount] = useState('');

	const [bankMessage, setBankMessage] = useState('');
	const [accountMessage, setAccountMessage] = useState('');

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ reservationNumber, bank, account }: CancelReservationType) => userCancelReservation({ reservationNumber, bank, account }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myReservation] });
			alert('예약이 정상적으로 취소되었습니다.');
		},
		onError: (error: AxiosError) => {
			if (error.response && error.response.status === 400 && error.response.data === '예약 취소 불가') {
				alert('예약 취소가 불가능한 기간입니다.');
			}
		},
	});

	const instructionYes = async () => {
		if (bank === '') {
			alert('은행사를 기입해주세요');
			return;
		}

		if (account === '') {
			alert('계좌를 입력해주세요');
			return;
		}

		mutate({ reservationNumber, bank, account });
		setBank('');
		setAccount('');

		// TODO: 예약 취소
		dispatch(closeModal());
	};

	const handleBank = (e: React.ChangeEvent<HTMLInputElement>) => {
		const hasNumber = /\d/.test(e.target.value);
		// visitorPhone 입력한 경우
		if (hasNumber) {
			// 숫자가 존재한 경우
			setBankMessage('숫자는 입력되지 않습니다.');
			return;
		}

		setBank(e.target.value);
		setBankMessage('');
	};

	const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (/[^0-9]/.test(e.target.value)) {
			// 문자가 존재한 경우
			setAccountMessage('문자는 입력되지 않습니다.');
			return;
		}
		setAccount(e.target.value);
		setAccountMessage('');
	};

	return (
		<div>
			<CancelReservationWrapper>
				<ChargeTitleBox>취소</ChargeTitleBox>
				<Title>수수료</Title>
				<ChargeContentsBox>
					<div>예약일 1주 전 : 100% 환불</div>
					<div>예약일 5일 전 : 70% 환불</div>
					<div>예약일 3일 전 : 50% 환불</div>
					<div>예약일 1일 전 ~ 당일 : 취소 불가</div>
				</ChargeContentsBox>
			</CancelReservationWrapper>
			<Title>환불 받을 계좌 정보</Title>
			<AccountWrapper>
				<div>
					<Set>
						<div>은행사</div>
						<input name="bank" value={bank} onChange={handleBank} />
						<div></div>
						{bankMessage && <Warning>{bankMessage}</Warning>}
					</Set>
				</div>
				<Set>
					<div>계좌</div>
					<input name="account" value={account} onChange={handleAccount} placeholder="-없이 입력해주세요." />
					<div></div>
					{accountMessage && <Warning>{accountMessage}</Warning>}
				</Set>
			</AccountWrapper>
			<br />
			<Warning> ※ 취소 버튼 클릭 시, 예약은 바로 취소됩니다. </Warning>
			<Center>
				<InstructionYesButton onClick={instructionYes}>예약 취소</InstructionYesButton>
			</Center>
		</div>
	);
};

export default CancelReservation;

const Center = styled.div`
	/* justify-content: center; */
	text-align: center;
`;

const CancelReservationWrapper = styled.div`
	margin: 1.3rem 0;
	text-align: center;
`;

const ChargeTitleBox = styled.div`
	color: ${color.backColor};
	background-color: ${color.color1};
	border-radius: 0.4rem;
	text-align: center;
	font-size: 1.2rem;
	margin-bottom: 1.5rem;
`;

const ChargeContentsBox = styled.div`
	text-align: left;
	color: ${color.darkGrayColor};
	font-size: 1rem;
	padding: 2vw;
`;

const InstructionYesButton = styled.button`
	text-align: center;
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	width: 80px;
	height: 30px;
	margin: 1rem;

	&:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;

const Warning = styled.div`
	margin-top: 0.5rem;
	color: red;
	font-size: 0.7rem;
`;
const AccountWrapper = styled.div`
	padding: 1rem;
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 1rem;
`;
const Title = styled.div`
	font-weight: bold;
	text-align: left;
	color: black;
`;

const Set = styled.div`
	display: grid;
	grid-template-columns: 25% 65%;
`;
