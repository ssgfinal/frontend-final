import { styled } from 'styled-components';
import { Collapse } from 'antd';

import { useEffect, useState } from 'react';
import ReservationCollapseDetail from './ReservationCollapseDetail';
import { openModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';

import { color } from '../../assets/styles';
import { accomodation } from '../../assets/icons';

interface UserReservationListProps {
	reservations: {
		userId: string;
		paymentDate: string; // 결제일
		reservationNumber: number; // 예약번호
		outdoorView: string; // 숙소이미지
		reservationStatus: number; // 예약상태
		reservationStartDate: string; // 예약시작날짜
		reservationEndDate: string; // 예약종료날짜
		accomName: string; // 숙소명
		roomCategory: string; // 객실 종류
		roomPrice: number; // 객실 가격
	};
}

const detail = [
	{
		userId: 'abc',
		reservationNumber: 1234567,
		guestName: '홍길동',
		guestPhone: '010-1234-5678',
		couponNumber: 123456789,
		couponName: '9월 할인',
		isUsed: 0,
		couponDiscount: 10000,
		pointDiscount: 5000,
		payment: 90000,
	},
	{
		userId: 'abc',
		reservationNumber: 7654321,
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponNumber: 123456789,
		couponName: '9월 반값~',
		isUsed: 1,
		couponDiscount: 50000,
		pointDiscount: 5000,
		payment: 100000,
	},
	{
		userId: 'cba',
		reservationNumber: 3234567,
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponNumber: 123456789,
		couponName: '9월',
		isUsed: 1,
		couponDiscount: 20000,
		pointDiscount: 3000,
		payment: 98000,
	},
	{
		userId: 'acb',
		reservationNumber: 5654321,
		guestName: '김철수',
		guestPhone: '010-1234-5678',
		couponNumber: 123456789,
		couponName: '9월',
		isUsed: 1,
		couponDiscount: 10000,
		pointDiscount: 5000,
		payment: 102000,
	},
];

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatPeriod = (reservationStartDate: string, reservationEndDate: string) => {
	const start = reservationStartDate.split('-');
	const startDate = start.join('');

	const end = reservationEndDate.split('-');
	const endDate = end.join('');

	const duration = parseInt(endDate, 10) - parseInt(startDate, 10) + 1;

	return duration > 1 ? `(${duration - 1}박 ${duration}일)` : '';
};

const ReservationList: React.FC<UserReservationListProps> = ({ reservations }) => {
	// TODO : 서버랑 연결 후 수정
	// const [details, setDetails] = useState([]);
	const [details, setDetails] = useState(detail);

	const Details = async () => {
		try {
			const response = details;
			//await fetch('http://localhost:3200/');
			const data = response;
			// await response.json();
			setDetails(data);
		} catch (error) {
			console.error('데이터를 불러오는 데 실패했습니다.', error);
		}
	};

	useEffect(() => {
		Details();
		// TODO: 서버 연결 후 수정
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 예약상태 종류가 추가되면 추가작업 필요
	const getStatusString = (reservationStatus: number): string => {
		switch (reservationStatus) {
			case 0:
				return '예약완료';
			case 1:
				return '이용완료';
			case 2:
				return '예약취소';
			default:
				return '알 수 없는 상태';
		}
	};

	// TODO : Detail 부분

	// 예약상태 배경색 변경
	const statusStyle = {
		color: reservations.reservationStatus === 0 ? color.color1 : reservations.reservationStatus === 1 ? color.color1 : color.backColor,
		backgroundColor:
			reservations.reservationStatus === 0 ? color.color5 : reservations.reservationStatus === 1 ? color.unSelectColor : color.unSelectColor,
	};

	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'instruction', modalSize: modalSize, modalText: '예약을 취소하시겠습니까?' }));
	};

	return (
		<ReservationWrapper>
			<ReservationMainContainer>
				<PaymentDateBox>{formatDate(reservations.paymentDate)}</PaymentDateBox>

				{reservations.reservationStatus === 0 && (
					<ReservationButton hidden={false} onClick={modalOpen}>
						취소하기
					</ReservationButton>
				)}

				<ReservationNumberBox>예약번호 {reservations.reservationNumber}</ReservationNumberBox>
			</ReservationMainContainer>
			<ReservationDetailContainer>
				<DetailContainer>
					<ImageBox>
						{/* TODO : 각 예약번호(reservation_number)에 맞는 상세정보대로 뿌릴 때	수정 */}
						{/* <OutdoorViewBox src={reservations.outdoor_view} alt="Accomodation"></OutdoorViewBox> */}
						<OutdoorViewBox src={accomodation} alt="Accomodation"></OutdoorViewBox>
					</ImageBox>
					<DetailBox>
						<ReservationStatusBox style={statusStyle}>{getStatusString(reservations.reservationStatus)}</ReservationStatusBox>
						<ReservationNameBox>
							{reservations.accomName}&nbsp;({reservations.roomCategory})
						</ReservationNameBox>
						<ReservationDateBox>
							{formatDate(reservations.reservationStartDate)}~{formatDate(reservations.reservationEndDate)}
							<br />
							{formatPeriod(reservations.reservationStartDate, reservations.reservationEndDate)}
						</ReservationDateBox>
						<RoomPriceBox>{reservations.roomPrice.toLocaleString()}원</RoomPriceBox>
					</DetailBox>
				</DetailContainer>
				<CollapseContainer>
					{detail.map((detailItem) =>
						detailItem.reservationNumber === reservations.reservationNumber ? (
							<Collapse
								key={detailItem.reservationNumber}
								size="small"
								ghost={true}
								accordion={true}
								bordered={false}
								items={[
									{
										key: reservations.reservationNumber,
										label: '상세정보',
										children: <ReservationCollapseDetail detail={detailItem} />,
									},
								]}
							/>
						) : null,
					)}
				</CollapseContainer>
			</ReservationDetailContainer>
		</ReservationWrapper>
	);
};

export default ReservationList;

const ReservationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 0.5rem;
	border: solid 1.5px ${color.color1};
	border-radius: 0.5rem;
	transition: width 0.1s;
`;

const ReservationMainContainer = styled.div`
	display: grid;
	grid-template-columns: 6.6fr 3.4fr;
	color: ${color.color1};
	padding-left: 1rem;
	text-align: left;
	font-weight: bold;
	font-size: 0.9rem;
	transition: width 0.1s;
`;

const PaymentDateBox = styled.div``;

const ReservationButton = styled.button`
	grid-column-start: 2;
	grid-column-end: 3;
	justify-self: right;
	align-self: center;
	border: 1px solid;
	border-radius: 0.5rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	font-weight: bold;

	&:hover {
		cursor: pointer;
		border: 1px solid;
		border-radius: 0.5rem;
		border-color: ${color.color3};
		background-color: ${color.color3};
		color: ${color.backColor};
		font-weight: bold;
	}

	@media (max-width: 700px) {
		font-size: 0.5rem;
		border: 1px solid;

		&:hover {
			font-size: 0.5rem;
			border: 1px solid;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.7rem;
		border: 1.5px solid;

		&:hover {
			font-size: 0.7rem;
			border: 1.5px solid;
		}
	}

	@media (min-width: 1400px) {
		font-size: 0.9rem;

		&:hover {
			font-size: 0.9rem;
		}
	}
`;

const ReservationNumberBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	color: ${color.color2};
	padding-left: 1vw;
	justify-self: left;
	align-self: flex-end;
	font-size: 0.8rem;
	font-weight: bold;
`;

const ReservationDetailContainer = styled.div`
	margin-top: 1rem;
`;

const DetailContainer = styled.div`
	display: grid;
	grid-column-gap: 10px;
	grid-template-columns: 1fr 1fr;
`;

const ReservationStatusBox = styled.div`
	align-self: center;
	border: none;
	font-size: 0.5rem;
	width: 4rem;
	height: 1rem;
	color: ${color.backColor};
	background-color: ${color.color2};
	border-radius: 1rem;
	text-align: center;
	line-height: 1rem;
	font-weight: bold;
`;

const ReservationNameBox = styled.div``;

const ReservationDateBox = styled.div`
	// 크기 어떻게 할 지....ㅠ
	font-size: 0.5rem;
`;

const RoomPriceBox = styled.div`
	font-weight: bold;
`;

const CollapseContainer = styled.div`
	transition: width 0.1s;
	.ant-collapse-header-text {
		font-size: 1rem;
		color: ${color.color1};
		text-align: left;
		align-self: center;
	}

	.ant-collapse-header-text:hover {
		color: ${color.color3};
	}

	.ant-collapse-content-box {
		font-size: 1rem;
		width: 100%;
		color: ${color.color1};
		text-align: justify;
	}

	.ant-collapse-expand-icon {
		width: 10%;
		color: ${color.color1};
		align-items: right;
	}

	@media (max-width: 700px) {
		.ant-collapse-content-box {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		.ant-collapse-content-box {
			font-size: 0.8rem;
		}
	}
`;

const ImageBox = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	align-self: center;
	transition: width 0.1s;
`;

const OutdoorViewBox = styled.img`
	width: 80%;
`;

const DetailBox = styled.div`
	color: ${color.color1};
	text-align: left;
	display: grid;
	transition: width 0.1s;
	width: 70%;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(4, 10fr);

	@media (max-width: 700px) {
		font-size: 0.8rem;
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.8rem;
	}

	@media (min-width: 1400px) {
		font-size: 1rem;
	}
`;
