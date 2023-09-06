import { styled } from 'styled-components';
import { Collapse } from 'antd';

import ReservationCollapseDetail from './ReservationCollapseDetail';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch } from '../hooks';

import { color } from '../assets/styles';
import { accomodation } from '../assets/icons';

interface Reservation {
	reservation: {
		user_id: string;
		reservation_number: number; // 예약번호
		outdoor_view: string[] | string; // 타입 longblob, 숙소이미지
		reservation_status: number; // 예약상태
		reservation_start_date: string; // 예약시작날짜
		accom_name: string; // 숙소명
		room_category: string; // 객실 종류
		room_price: number; // 객실 가격
	};
}

const detail = [
	{
		user_id: 'abc',
		reservation_number: 1234567,
		guest_name: '홍길동',
		guest_phone: '010-1234-5678',
		coupon_number: 123456789,
		coupon_name: '9월',
		is_used: 0,
		discount: 50000,
	},
	// TODO : 더미 데이터, 각 예약번호에 맞는 상세정보 연결할 때
	// {
	// 	user_id: 'abc',
	// 	reservation_number: 7654321,
	// 	guest_name: '김철수',
	// 	guest_phone: '010-1234-5678',
	// 	coupon_number: 123456789,
	// 	coupon_name: '9월',
	// 	is_used: 1,
	// 	discount: 50000,
	// },
];

// 예약상태 0, 1은 각각 무엇인지?, 상태에 따라 색변경 추후에 작업
// style은 왜 error? => (수정) state로 관리하기
const reservation_status = document.querySelector('.item_reser_status');

if (reservation_status !== null) {
	const status = 0;
	if (status === 0) {
		reservation_status.style.color = `${color.color1}`;
		reservation_status.style.backgroundColor = `${color.color5}`;
	} else if (status === 1) {
		reservation_status.style.color = `${color.backColor}`;
		reservation_status.style.backgroundColor = `${color.color2}`;
	}
}

const formatDate = (dateString: string) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusString = (reservationStatus: number): string => {
	switch (reservationStatus) {
		case 0:
			return '예약완료';
		case 1:
			return '이용완료';
		default:
			return '알 수 없는 상태';
	}
};

const ReservationList: React.FC<Reservation> = ({ reservation }) => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'cancel', modalSize: modalSize }));
	};

	return (
		<div>
			<ReservationWrapper>
				<div className="reservationbox">
					<div className="item_reservation_date">{formatDate(reservation.reservation_start_date)}</div>
					{/* TODO : 이용완료시 예약취소 버튼 비활성화 */}
					<div className="item_reser_button">
						<button onClick={modalOpen}>예약취소</button>
					</div>
					<div className="item_reservation_number">
						<span>예약번호 {reservation.reservation_number}</span>
						<div></div>
					</div>
				</div>
				<ReservationContainer>
					<DetailContainer>
						<ImageBox>
							{/* TODO : 각 예약번호(reservation_number)에 맞는 상세정보대로 뿌릴 때	수정 */}
							{/* <img src={item.outdoor_view} className="imagebox" alt="Accomodation"></img> */}
							<img src={accomodation} className="imagebox" alt="Accomodation"></img>
						</ImageBox>
						<DetailBox>
							<div className="detailbox">
								<div className="item_reser_status">{getStatusString(reservation.reservation_status)}</div>
								<div className="item_reser_name">{reservation.accom_name}</div>
								<div className="item_room_cate">{reservation.room_category}</div>
								<div className="item_room_price">{reservation.room_price.toLocaleString()}원</div>
							</div>
						</DetailBox>
					</DetailContainer>
					<CollapseContainer>
						{/* TODO : 각 예약번호(reservation_number)에 맞는 상세정보대로 뿌릴 때	수정 */}
						{/* <Collapse size="small" ghost={true} accordion={true} bordered={false}>
								{detail.map((detailItem) =>
									detailItem.reservation_number === reservation.reservation_number ? (
										<Collapse.Panel key={detailItem.reservation_number} header={`상세정보`}>
											<ReservationCollapseDetail detail={detailItem} />
										</Collapse.Panel>
									) : null,
								)}
							</Collapse> */}
						{...detail.map((item) => (
							<Collapse
								key={item.reservation_number}
								size="small"
								ghost={true}
								accordion={true}
								bordered={false}
								items={[
									{
										key: item.reservation_number,
										label: '상세정보',
										children: <ReservationCollapseDetail detail={item} />,
									},
								]}
							/>
						))}
					</CollapseContainer>
				</ReservationContainer>
			</ReservationWrapper>
		</div>
	);
};

export default ReservationList;

const ReservationWrapper = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 0.5rem;
	border: solid 1.5px ${color.color1};
	border-radius: 0.5rem;
	display: inline-flex;
	flex-direction: column;

	.reservationbox {
		display: grid;
		grid-template-columns: 50fr 50fr;
		grid-template-rows: repeat(2, 4fr);
	}

	.reservationbox {
		color: ${color.color1};
		padding-left: 1rem;
		text-align: left;
		font-weight: bold;
		font-family: Arial;
	}

	.item_reser_button {
		grid-column-start: 2;
		grid-column-end: 3;
		justify-self: right;
		align-self: center;

		button {
			border: 1px solid;
			border-radius: 0.5rem;
			background-color: ${color.color1};
			color: ${color.backColor};
			font-weight: bold;
		}

		button:hover {
			border: 1px solid;
			border-radius: 0.5rem;
			border-color: ${color.color3};
			background-color: ${color.color3};
			color: ${color.backColor};
			font-weight: bold;
		}
	}

	.item_reservation_number {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
		color: ${color.color2};
		padding-left: 1.3vw;
		justify-self: left;
		align-self: flex-end;
		font-size: 0.9vw;
		font-weight: bold;
	}

	@media (max-width: 540px) {
		.reservationbox {
			font-size: 0.8rem;
			transition: width 0.1s;
		}

		.item_reser_button button {
			font-size: 0.5rem;
			border: 1px solid;
			transition: width 0.1s;
		}

		.item_reser_button button:hover {
			font-size: 0.5rem;
			border: 1px solid;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.reservationbox {
			font-size: 0.9rem;
			transition: width 0.1s;
		}

		.item_reser_button button {
			font-size: 0.7rem;
			border: 1.5px solid;
			transition: width 0.1s;
		}

		.item_reser_button button:hover {
			font-size: 0.7rem;
			border: 1.5px solid;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.reservationbox {
			font-size: 1rem;
			transition: width 0.1s;
		}

		.item_reser_button button {
			font-size: 0.9rem;
			transition: width 0.1s;
		}

		.item_reser_button button:hover {
			font-size: 0.9rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.reservationbox {
			font-size: 1rem;
			transition: width 0.1s;
		}

		.item_reser_button button {
			font-size: 0.8rem;
			transition: width 0.1s;
		}

		.item_reser_button button:hover {
			font-size: 0.8rem;
			transition: width 0.1s;
		}
	}

	// TODO : 반응형 추가

	@media (max-width: 360px) {
		width: 90vw;
	}

	@media (min-width: 360px) and (max-width: 540px) {
		width: 70vw;
	}

	@media (min-width: 540px) and (max-width: 768px) {
		width: 43vw;
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		width: 45vw;
	}

	@media (min-width: 1024px) and (max-width: 1700px) {
		width: 25vw;
	}

	@media (min-width: 1700px) {
		width: 20vw;
	}
`;

const ReservationContainer = styled.div`
	margin-top: 1rem;
`;

const DetailContainer = styled.div`
	display: inline-flex;
`;

const CollapseContainer = styled.div`
	display: grid;
	.ant-collapse-header-text {
		color: ${color.color1};
		text-align: left;
		font-size: 1rem;
		align-self: center;
	}

	.ant-collapse-header-text:hover {
		color: ${color.color3};
	}

	.ant-collapse-content-box {
		color: ${color.color1};
		text-align: justify;
		background-color: ${color.backColor};
	}

	.ant-collapse-expand-icon {
		color: ${color.color1};
		align-items: right;
	}

	@media (max-width: 360px) {
		.ant-collapse-content-box {
			width: 70vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.ant-collapse-content-box {
			width: 55vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.ant-collapse-content-box {
			width: 30vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.ant-collapse-content-box {
			width: 40vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.ant-collapse-content-box {
			width: 23vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}
`;

const ImageBox = styled.div`
	display: inline-flex;
	flex-direction: row;
	padding-left: 2rem;
	padding-right: 1rem;
	transition: width 0.1s;

	@media (max-width: 360px) {
		.imagebox {
			width: 25vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.imagebox {
			width: 20vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.imagebox {
			width: 15vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.imagebox {
			width: 17vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.imagebox {
			width: 10vw;
			transition: width 0.1s;
		}
	}
`;

const DetailBox = styled.div`
	color: ${color.color1};
	display: inline-flex;
	flex-direction: row;
	text-align: left;

	.detailbox {
		display: grid;
		grid-template-columns: 70fr;
		grid-template-rows: repeat(4, 10fr);
	}

	.item_reser_status {
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
	}

	.item_reser_name {
		align-self: flex-start;
	}

	.item_room_cate {
		align-self: flex-start;
	}

	.item_room_price {
		font-weight: bold;
		align-self: flex-start;
	}

	@media (max-width: 360px) {
		.detailbox {
			width: 43vw;
			font-size: 0.8rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.detailbox {
			width: 40vw;
			font-size: 0.8rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.detailbox {
			width: 30vw;
			font-size: 0.7rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.detailbox {
			width: 20vw;
			font-size: 0.9rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.detailbox {
			width: 10vw;
			font-size: 0.9rem;
			font-family: Arial;
			transition: width 0.1s;
		}
	}
`;