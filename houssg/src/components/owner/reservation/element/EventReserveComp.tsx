import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { calendarDate, ownerHouseId, reservationInfo } from '../../../../store/redux/calendarSlice';
import { cancelReservation } from '../../../../helper';
import { ownerKey } from '../../../../assets/constant';
import { closeModal } from '../../../../store/redux/modalSlice';
import styled from 'styled-components';
import { color } from '../../../../assets/styles';

const EventReserveComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const date = useAppSelector(calendarDate);

	const { start, end, eventId, eventRoomName, guestName, guestNumber } = useAppSelector(reservationInfo);
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => cancelReservation(Number(eventId)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ownerKey.getReservationData, houseId, date] });
			dispatch(closeModal());
			alert('취소완료');
		},
		onError: () => {
			alert('실패');
		},
	});

	const onClickCancelBtn = () => {
		const confirmCancel = window.confirm('정말로 예약을 취소하시겠습니까?');
		if (confirmCancel) {
			mutate();
			console.log(eventId);
		}
	};

	return (
		<Container>
			<InfoText>방 이름 : {eventRoomName}</InfoText>
			<InfoText>예약자 : {guestName}</InfoText>
			<InfoText>연락처 : {guestNumber}</InfoText>
			<InfoText>입실 : {start} </InfoText>
			<InfoText>퇴실 : {end}</InfoText>
			<CancelBtn onClick={onClickCancelBtn}>예약 취소</CancelBtn>
		</Container>
	);
};

export default EventReserveComp;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 0 auto;
	gap: 0.5rem;
`;

const InfoText = styled.div`
	font-weight: 600;
	font-size: 0.9rem;
`;

const CancelBtn = styled.div`
	margin-top: 0.5rem;
	cursor: pointer;
	border-radius: 4px;
	border: 2px solid ${color.darkGrayColor};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: border-color 0.2s, color 0.2s;
	font-weight: 600;
	font-size: 0.9rem;
	&:hover {
		border-color: ${color.red};
		color: ${color.red};
	}
`;
