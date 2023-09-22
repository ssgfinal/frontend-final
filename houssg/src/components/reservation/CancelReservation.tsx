import styled from 'styled-components';
import { color } from '../../assets/styles';
import { closeModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';

const CancelReservation = () => {
	const dispatch = useAppDispatch();

	const instructionYes = () => {
		// TODO: 예약 취소
		dispatch(closeModal());
	};

	return (
		<CancelReservationWrapper>
			<ChargeTitleBox>취소 수수료</ChargeTitleBox>
			<ChargeContentsBox>
				<div>예약일 1달 전 : 100% 환불</div>
				<div>예약일 1달~ 1주 전 : 50% 환불</div>
				<div>예약일 1주 미만 : 환불 불가</div>
			</ChargeContentsBox>
			<InstructionYesButton onClick={instructionYes}>예약 취소</InstructionYesButton>
		</CancelReservationWrapper>
	);
};

export default CancelReservation;

const CancelReservationWrapper = styled.div`
	margin-top: 1.3rem;
	text-align: center;
`;

const ChargeTitleBox = styled.div`
	color: ${color.backColor};
	background-color: ${color.color1};
	border-radius: 0.4rem;
	text-align: center;
	font-size: 1.2rem;
`;

const ChargeContentsBox = styled.div`
	text-align: left;
	color: ${color.darkGrayColor};
	font-size: 1rem;
	padding: 2vw;
`;

const InstructionYesButton = styled.button`
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
