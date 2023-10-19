import styled from 'styled-components';
import { useAppSelector } from '../../../hooks';
import { modalText } from '../../../store/redux/modalSlice';
// import { calendarOwnerData } from '../../../store/redux/calendarSlice';
import { DateCalModalComp, EventCalModalComp } from '.';

const OwnerReservationModal = () => {
	const calendarTypeInfo = useAppSelector(modalText);
	const typeArray = calendarTypeInfo.split('#');
	const purposeType = typeArray[0];
	const clickType = typeArray[1];
	const dateInfo = typeArray[2];
	// const calendarInfo = useAppSelector(calendarOwnerData);

	const title =
		purposeType === 'reserve'
			? clickType === 'event'
				? '예약 정보'
				: dateInfo + ' 예약 목록'
			: purposeType === 'available'
			? clickType === 'event'
				? '오프라인 예약추가'
				: dateInfo + ' 이용가능 객실'
			: '닫는중...';

	return (
		<Container>
			<OwnerReserveTitle>{title}</OwnerReserveTitle>
			<div>
				{clickType === 'event' ? (
					<EventCalModalComp purposeType={purposeType} />
				) : clickType === 'date' ? (
					<DateCalModalComp purposeType={purposeType} />
				) : (
					<div></div>
				)}
			</div>
		</Container>
	);
};

export default OwnerReservationModal;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
`;

const OwnerReserveTitle = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	@media screen and (max-width: 600px) {
		font-size: 1rem;
	}
`;
