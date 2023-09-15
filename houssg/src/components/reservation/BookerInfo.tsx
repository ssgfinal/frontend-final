import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const BookerInfo = () => {
	const reservation = {
		id: 1,
		night: 2,
		price: 64000,
		userNickName: '김도로뇽',
		userPhone: '01012345678',
	};

	return (
		<ReservationCommonBox>
			<UserReservationTitle>예약자 정보</UserReservationTitle>
			<UserReservationLeft>
				{reservation.userNickName} / {reservation.userPhone}
			</UserReservationLeft>
		</ReservationCommonBox>
	);
};
