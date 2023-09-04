import { styled } from 'styled-components';

import ReservationList from '../../components/ReservationList';
import { accomodation } from '../../assets/icons';
// TODO : 같은 유저의 예약정보 뿌리기..나중에 수정
// import { useIsUser } from '../../hooks';

// TODO : 더미 데이터 기능구현 후 지우기
const reservation = [
	{
		user_id: 'abc',
		reservation_number: 1234567,
		outdoor_view: accomodation,
		reservation_status: 0,
		reservation_start_date: '2023-09-02',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 100000,
	},
	{
		user_id: 'abc',
		reservation_number: 7654321,
		outdoor_view: accomodation,
		reservation_status: 1,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 200000,
	},
	{
		user_id: 'abc',
		reservation_number: 1234567,
		outdoor_view: accomodation,
		reservation_status: 0,
		reservation_start_date: '2023-09-02',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 100000,
	},
	{
		user_id: 'abc',
		reservation_number: 7654321,
		outdoor_view: accomodation,
		reservation_status: 1,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 200000,
	},
	{
		user_id: 'abc',
		reservation_number: 1234567,
		outdoor_view: accomodation,
		reservation_status: 0,
		reservation_start_date: '2023-09-02',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 100000,
	},
	{
		user_id: 'abc',
		reservation_number: 7654321,
		outdoor_view: accomodation,
		reservation_status: 1,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 200000,
	},
];

const UserReservationList = () => {
	{
		/* TODO : 같은 유저의 예약정보 뿌리기..나중에 수정 */
	}
	//const isUser = useIsUser();

	return (
		<UserReservationWrapper>
			{/* TODO : 같은 유저의 예약정보 뿌리기..나중에 수정 */}
			{/* {reservation.map((item) =>
				reservation.user_id === isUser ? (
					<div key={item.reservation_number}>
						<ReservationList reservation={reservation} />
					</div>
				) : null,
			)} */}
			{reservation.map((item, index) => (
				<div key={index}>
					<ReservationList reservation={item} />
				</div>
			))}
		</UserReservationWrapper>
	);
};

export default UserReservationList;

const UserReservationWrapper = styled.div`
	display: grid;
	justify-self: center;
	@media (max-width: 360px) {
		grid-template-columns: 1fr;
	}
	@media (min-width: 360px) and (max-width: 540px) {
		grid-template-columns: 1fr;
		justify-self: center;
		align-self: center;
	}

	@media (min-width: 540px) and (max-width: 768px) {
		grid-template-columns: 1fr 1fr;
		padding-left: 3vw;
		padding-right: 3vw;
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		grid-template-columns: 1fr 1fr;
		padding-left: 3vw;
		padding-right: 3vw;
	}

	@media (min-width: 1024px) and (max-width: 1700px) {
		grid-template-columns: 1fr 1fr 1fr;
		padding-left: 5vw;
		padding-right: 5vw;
	}

	@media (min-width: 1700px) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1vw;
		padding-left: 3vw;
		padding-right: 3vw;
	}
`;
