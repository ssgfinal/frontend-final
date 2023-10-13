import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomInfo } from '../../components/reservation/RoomInfo';
import { BookerInfo } from '../../components/reservation/BookerInfo';
import { VisitorInfo } from '../../components/reservation/VisitorInfo';
import { Breakdown } from '../../components/reservation/Breakdown';
import { PaymentWidget } from '../../components/reservation/PaymentWidget';
// import { useState } from 'react';
import { useEffect, useState } from 'react';
// import api from '../../api/api';
// import { userUrl } from '../../assets/constant';

interface Coupon {
	couponId: string;
	couponName: string;
	// expirationDate: string; // 예약하기 페이지에선 없어도 될 듯
	discountPrice: number;
}

// 백으로부터 받는 값
interface GetReservation {
	roomId: number;
	reservationAvailability: boolean[];
	couponList: Coupon[]; // get해서 얻은 사용 가능한 쿠폰 리스트
	totalPoint: number;
}

// 백에 보낼 값
interface GiveReservation {
	roomId: number;
	selectedReservationDate?: string;
	visitorName: string;
	visitorPhone: string;
	usingCoupon: Coupon; // 프론트에서 선택한 쿠폰 한개
	usingPoint: number;
	paymentPrice: number;
}
export const UserReservation = () => {
	const { roomId } = useParams();
	console.log('roomId > ', roomId);

	// 백 연동 시 roomId 보낼 때 사용할 변수들
	const location = useLocation();
	const room = location.state.room;
	// console.log('UserReservation useLocation room > ', room);

	const [initReservation, setInitReservation] = useState<GetReservation>();
	const [selectedReservation, setSelectedReservation] = useState<GiveReservation>({
		roomId: room.roomId,
		selectedReservationDate: '',
		visitorName: '',
		visitorPhone: '',
		usingCoupon: {
			couponId: '',
			couponName: '',
			// expirationDate: '', // 예약하기 페이지에선 없어도 될 듯
			discountPrice: 0,
		},
		// 프론트에서 선택한 쿠폰 한개
		usingPoint: 0,
		paymentPrice: 0,
	});

	// TODO: 백과 연동 ( 예약하기 페이지 들어왔을 때 뿌려줄 데이터 받아오는 api)
	useEffect(() => {
		// api.get(userUrl.review + `?roomId=${room.roomId}`).then(({ data }) => {
		// 	// setInitReservation(data);
		// });
		// console.log('UserReservation useEffect 돈다~');
		setInitReservation({
			roomId: room.roomId,
			reservationAvailability: [true],
			couponList: [
				{
					couponId: '1',
					couponName: '9월달 행사',
					// expirationDate: '2023-09-10',
					discountPrice: 3000,
				},
				{
					couponId: '2',
					couponName: '대체공휴일 맞이',
					// expirationDate: '2023-10-20',
					discountPrice: 1200,
				},
			],
			totalPoint: 35,
		});
		setSelectedReservation({
			...selectedReservation,
			roomId: room.rommId,
		});
	}, []);

	// 결제 금액
	// const [payment, setPayment] = useState(0);

	return (
		<Wrapper>
			<RoomInfo />
			<BookerInfo />
			<VisitorInfo selectedReservation={selectedReservation} setSelectedReservation={setSelectedReservation} />
			{initReservation && (
				<>
					<Breakdown
						// payment={payment} setPayment={setPayment}
						initReservation={initReservation}
						selectedReservation={selectedReservation}
						setSelectedReservation={setSelectedReservation}
					/>
					<PaymentWidget
						// payment={payment}
						selectedReservation={selectedReservation}
					/>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	@media (min-width: 850px) {
		padding: 2rem 15rem;
	}
	@media (min-width: 550px) and (max-width: 850px) {
		padding: 2rem 7rem;
	}
	@media (max-width: 550px) {
		padding: 2rem;
	}

	display: grid;
	grid-gap: 1rem;
`;
