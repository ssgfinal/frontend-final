import { Desert, accomodation } from '../../assets/icons';
import ReservationList from '../../components/ReservationList';

const UserReservationList = () => {
	return (
		<div>
			<div>
				<ReservationList
					reservation={{
						outdoor_view: accomodation,
						reservation_number: 1234567,
						reservation_status: 0,
						reservation_start_date: '2023-08-31',
						accom_name: '가나다 Hotel',
						room_category: 'Standard Room',
						room_price: 100000,
					}}
				/>
			</div>
			<div>
				<ReservationList
					reservation={{
						outdoor_view: Desert,
						reservation_number: 7654321,
						reservation_status: 1,
						reservation_start_date: '2023-09-01',
						accom_name: '라마바 Hotel',
						room_category: 'Suite Room',
						room_price: 100000,
					}}
				/>
			</div>
			<div>
				<ReservationList
					reservation={{
						outdoor_view: Desert,
						reservation_number: 7654321,
						reservation_status: 1,
						reservation_start_date: '2023-09-01',
						accom_name: '라마바 Hotel',
						room_category: 'Suite Room',
						room_price: 100000,
					}}
				/>
			</div>
		</div>
	);
};

export default UserReservationList;
