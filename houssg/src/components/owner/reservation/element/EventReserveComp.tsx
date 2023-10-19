import { useAppSelector } from '../../../../hooks';
import { calendarDate, ownerHouseId, reservationInfo } from '../../../../store/redux/calendarSlice';

const EventReserveComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const date = useAppSelector(calendarDate);
	const { start, end, eventId, eventRoomName } = useAppSelector(reservationInfo);

	return (
		<div>
			<div>방 이름 : {eventRoomName}</div>
			<div>이벤트 시작일 : {start} </div>
			<div>이벤트 종료일 : {end}</div>
			<div>예약 번호 : {eventId}</div>
			<div>취소하기</div>
		</div>
	);
};

export default EventReserveComp;
