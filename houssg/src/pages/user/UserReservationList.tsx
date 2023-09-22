import { styled } from 'styled-components';

import ReservationList from '../../components/reservation/ReservationList';
import { accomodation } from '../../assets/icons';
import { useEffect, useState } from 'react';
// TODO : 같은 유저의 예약정보 뿌리기..나중에 수정
// import { useIsUser } from '../../hooks';

// TODO : 더미 데이터 기능구현 후 지우기

const reservations = [
	{
		userId: 'abc',
		outdoorView: accomodation,
		reservationStatus: 0,
		reservationStartDate: '2023-09-02',
		reservationEndDate: '2023-09-03',
		accomName: '가나다 Hotel',
		roomCategory: 'Standard',
		roomPrice: 100000,
		reservationNumber: 1234567,
		paymentDate: '2023-08-01',
		guestName: '홍길동',
		guestPhone: '010-1234-5678',
		couponName: '9월 할인',
		couponNumber: 123456789,
		isUsed: 0,
		couponDiscount: 10000,
		pointDiscount: 5000,
		payment: 90000,
	},
	{
		userId: 'abc',
		outdoorView: accomodation,
		reservationStatus: 2,
		reservationStartDate: '2023-09-03',
		reservationEndDate: '2023-09-05',
		accomName: '가나다 Hotel',
		roomCategory: 'Standard',
		roomPrice: 223000,
		reservationNumber: 7654321,
		paymentDate: '2023-08-02',
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponName: '9월 반값~',
		couponNumber: 123456789,
		isUsed: 1,
		couponDiscount: 50000,
		pointDiscount: 5000,
		payment: 100000,
	},
	{
		userId: 'abc',
		outdoorView: accomodation,
		reservationStatus: 0,
		reservationStartDate: '2023-09-02',
		reservationEndDate: '2023-09-03',
		accomName: '가나다 Hotel',
		roomCategory: 'Standard',
		roomPrice: 178000,
		reservationNumber: 3234567,
		paymentDate: '2023-08-03',
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponName: '9월',
		couponNumber: 123456789,
		isUsed: 1,
		couponDiscount: 20000,
		pointDiscount: 3000,
		payment: 98000,
	},
	{
		userId: 'abc',
		outdoorView: accomodation,
		reservationStatus: 1,
		reservationStartDate: '2023-09-03',
		reservationEndDate: '2023-09-08',
		accomName: '가나다 Hotel',
		roomCategory: 'Standard',
		roomPrice: 212000,
		reservationNumber: 5654321,
		paymentDate: '2023-08-04',
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponName: '9월',
		couponNumber: 123456789,
		isUsed: 1,
		couponDiscount: 10000,
		pointDiscount: 5000,
		payment: 102000,
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
		// TODO: 서버 연결 후 수정
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserReservationWrapper>
			<UserReservationContainer>
				{/* TODO : 같은 유저의 예약정보 뿌리기..나중에 수정 */}
				{/* {reservations.map((userItem, userIndex) => (
					<div key={userIndex}>
						{reservs.map(
							(reserItem, reserIndex) =>
								reserItem.user_id === userItem.user_id && (
									<div key={reserIndex}>
										<ReservationList reservations={reserItem} />
									</div>
								),
						)}
					</div>
				))} */}
				{reservations.map((reserItem, index) => (
					<div key={index}>
						<ReservationList reservations={reserItem} />
					</div>
				))}
			</UserReservationContainer>
		</UserReservationWrapper>
	);
};

export default UserReservationList;

const UserReservationWrapper = styled.div``;

const UserReservationContainer = styled.div`
	width: 80%;
	grid-area: a;
	display: grid;
	justify-content: center;
	margin: 1rem auto;
	grid-gap: 1rem;

	@media (min-width: 1400px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
	}

	@media (min-width: 1200px) and (max-width: 1400px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
	}

	@media (min-width: 700px) and (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'a a';
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
		grid-template-areas: 'a';
	}
`;
