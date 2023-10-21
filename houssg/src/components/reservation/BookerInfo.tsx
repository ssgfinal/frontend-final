import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

const BookerInfo = () => {
	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');
	console.log('BookerInfo 컴포넌트 실행');
	return (
		<ReservationCommonBox>
			<UserReservationTitle>예약자 정보</UserReservationTitle>
			<UserReservationLeft>
				{userNickName} / {userPhone}
			</UserReservationLeft>
		</ReservationCommonBox>
	);
};

export default BookerInfo;
