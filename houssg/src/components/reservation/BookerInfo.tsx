import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const BookerInfo = () => {
	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');

	return (
		<ReservationCommonBox>
			<UserReservationTitle>예약자 정보</UserReservationTitle>
			<UserReservationLeft>
				{userNickName} / {userPhone}
			</UserReservationLeft>
		</ReservationCommonBox>
	);
};
