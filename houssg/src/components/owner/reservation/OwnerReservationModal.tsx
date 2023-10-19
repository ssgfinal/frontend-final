import styled from 'styled-components';
import { useAppSelector } from '../../../hooks';
import { modalText } from '../../../store/redux/modalSlice';

const OwnerReservationModal = () => {
	const modalInfo = useAppSelector(modalText);
	const typeArray = modalInfo.split('#');
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
				: dateInfo + ' 이용가능 객실'
			: '닫는중...';

	return (
		<div>
			<OwnerReserveTitle>{title}</OwnerReserveTitle>
			<div></div>
		</div>
	);
};

export default OwnerReservationModal;

const OwnerReserveTitle = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	@media screen and (max-width: 600px) {
		font-size: 1rem;
	}
`;
