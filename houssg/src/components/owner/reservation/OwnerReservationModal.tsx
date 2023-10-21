import styled from 'styled-components';
import { useAppSelector } from '../../../hooks';
import { modalText } from '../../../store/redux/modalSlice';
import { color } from '../../../assets/styles';
import { DateAvailComp, DateReserveComp, EventAvailComp, EventReserveComp } from './element';

const OwnerReservationModal = () => {
	const calendarTypeInfo = useAppSelector(modalText);
	const typeArray = calendarTypeInfo.split('#');
	const purposeType = typeArray[0];
	const clickType = typeArray[1];
	const dateInfo = typeArray[2];

	const title =
		purposeType === 'reserve'
			? clickType === 'event'
				? '예약 정보'
				: dateInfo + ' 예약 목록'
			: purposeType === 'available'
			? clickType === 'event'
				? '오프라인 예약추가'
				: dateInfo + ' 여분 객실'
			: '닫는중...';

	return (
		<Container>
			<OwnerReserveTitle>{title}</OwnerReserveTitle>
			<>
				{clickType === 'event' ? (
					<>
						{purposeType === 'reserve' && <EventReserveComp />}
						{purposeType === 'available' && <EventAvailComp />}
					</>
				) : clickType === 'date' ? (
					<>
						{purposeType === 'reserve' && <DateReserveComp />}
						{purposeType === 'available' && <DateAvailComp />}
					</>
				) : (
					<div></div>
				)}
			</>
		</Container>
	);
};

export default OwnerReservationModal;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const OwnerReserveTitle = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	color: ${color.color1};
	@media screen and (max-width: 600px) {
		font-size: 1rem;
	}
`;
