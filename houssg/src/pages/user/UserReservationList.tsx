import { styled } from 'styled-components';

import ReservationList from '../../components/reservation/ReservationList';
import { accomodation } from '../../assets/icons';
import { useEffect, useState } from 'react';
// TODO : 같은 유저의 예약정보 뿌리기..나중에 수정
// import { useIsUser } from '../../hooks';

// TODO : 더미 데이터 기능구현 후 지우기
const reservations = [
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
		reservation_status: 2,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 223000,
	},
	{
		user_id: 'abc',
		reservation_number: 3234567,
		outdoor_view: accomodation,
		reservation_status: 0,
		reservation_start_date: '2023-09-02',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 178000,
	},
	{
		user_id: 'abc',
		reservation_number: 5654321,
		outdoor_view: accomodation,
		reservation_status: 1,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 212000,
	},
	{
		user_id: 'abc',
		reservation_number: 4234567,
		outdoor_view: accomodation,
		reservation_status: 2,
		reservation_start_date: '2023-09-02',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 145000,
	},
	{
		user_id: 'abc',
		reservation_number: 9654321,
		outdoor_view: accomodation,
		reservation_status: 1,
		reservation_start_date: '2023-09-03',
		accom_name: '가나다 Hotel',
		room_category: 'Standard',
		room_price: 123000,
	},
];

const UserReservationList = () => {
	{
		/* TODO : 같은 유저의 예약정보 뿌리기..나중에 수정 */
	}
	//const isUser = useIsUser();

	// TODO : 서버 연결하면 윗줄사용, 현재는 더미데이터
	// const [reservations, setReservations] = useState([]);
	const [reservs, setReservs] = useState(reservations);

	const Server = async () => {
		try {
			const response = reservs;
			//await fetch('http://localhost:3200/');
			const data = response;
			// await response.json();
			setReservs(data);
		} catch (error) {
			console.error('데이터를 불러오는 데 실패했습니다.', error);
		}
	};

	useEffect(() => {
		Server();
		console.log(reservations);
	}, []);

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
			<UserReservationContainer>
				{reservations.map((item, index) => (
					<div key={index}>
						<ReservationList reservations={item} />
					</div>
				))}
			</UserReservationContainer>
		</UserReservationWrapper>
	);
};

export default UserReservationList;

const UserReservationWrapper = styled.div``;

const UserReservationContainer = styled.div`
	grid-area: a;
	display: grid;
	margin: 1rem auto;
	grid-gap: 1rem;

	@media (min-width: 1400px) {
		width: 80%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
		justify-content: center;
	}

	@media (min-width: 1200px) and (max-width: 1400px) {
		width: 80%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
		justify-content: center;
	}

	@media (min-width: 700px) and (max-width: 1200px) {
		width: 80%;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'a a';
		justify-content: center;
	}

	@media (max-width: 700px) {
		width: 80%;
		grid-template-columns: 1fr;
		grid-template-areas: 'a';
		justify-content: center;
	}
`;
