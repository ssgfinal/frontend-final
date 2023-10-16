import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import RoomInfo from '../../components/reservation/RoomInfo';
import { BookerInfo } from '../../components/reservation/BookerInfo';
import { VisitorInfo } from '../../components/reservation/VisitorInfo';
import { Breakdown } from '../../components/reservation/Breakdown';
import { PaymentWidget } from '../../components/reservation/PaymentWidget';
import { useEffect, useState } from 'react';
import { CouponType, BookableRoomCnt, SelectedReservationType } from '../../types';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';

export const UserReservation = () => {
	const { roomId } = useParams();

	const [initBookableRoomList, setInitBookableRoomList] = useState<BookableRoomCnt[]>([]);
	const [initCouponList, setInitCouponList] = useState<CouponType[]>();

	const [selectedReservation, setSelectedReservation] = useState<SelectedReservationType>({
		roomId: Number(roomId),
		selectedReservationDate: '',
		startDate: '',
		endDate: '',
		night: 0,
		visitorName: '',
		visitorPhone: '',
		usingCoupon: {
			couponNumber: '',
			couponName: '',
			// expirationDate: '', // 예약하기 페이지에선 없어도 될 듯
			discount: 0,
		},
		// 프론트에서 선택한 쿠폰 한개
		usingPoint: 0,
		paymentPrice: 0,
	});
	console.log('roomID', roomId);

	// TODO: 백과 연동 ( 예약하기 페이지 들어왔을 때 뿌려줄 데이터 받아오는 api)
	useEffect(() => {
		api.get(userUrl.reservation, { params: { roomNumber: roomId } }).then(({ data }) => {
			setInitBookableRoomList(data.bookableRoomList);
			setInitCouponList(data.couponInfoList);
		});
	}, []);

	return (
		<Wrapper>
			<RoomInfo
				initBookableRoomList={initBookableRoomList}
				selectedReservation={selectedReservation}
				setSelectedReservation={setSelectedReservation}
			/>
			<BookerInfo />
			<VisitorInfo selectedReservation={selectedReservation} setSelectedReservation={setSelectedReservation} />
			{initCouponList && (
				<>
					<Breakdown initCouponList={initCouponList} selectedReservation={selectedReservation} setSelectedReservation={setSelectedReservation} />
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
