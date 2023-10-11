import { useLocation } from 'react-router-dom';
import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const RoomInfo = () => {
	const location = useLocation();
	const houseName = location.state.houseName;
	const room = location.state.room;
	// console.log('RoomInfo houseName > ', houseName, 'room > ', room);
	// const houseName = '센텀 제일 가는 호텔';
	// const room = {
	// 	id: 1,
	// 	type: '스탠다드',
	// 	price: 32000,
	// };

	return (
		<ReservationCommonBox>
			<UserReservationTitle>객실 정보</UserReservationTitle>
			<UserReservationLeft>{houseName}</UserReservationLeft>
			<UserReservationLeft>{room.type}</UserReservationLeft>
			<UserReservationLeft> 예약 가능 날짜 및 시간 (feat. 달력)</UserReservationLeft>
			<UserReservationLeft>
				<div>1박당 {room.price.toLocaleString()}원</div>
			</UserReservationLeft>
		</ReservationCommonBox>
	);
};
