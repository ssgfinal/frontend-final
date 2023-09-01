import { styled } from 'styled-components';
import { Collapse } from 'antd';

import React from 'react';
import BriefHouse from './BriefHouse';
import { openModal } from '../store/redux/modalSlice';
import { useAppDispatch } from '../hooks';

import { color } from '../assets/styles';
import { accomodation } from '../assets/icons';

interface Reservation {
	reservation: {
		outdoor_view: string[] | string; // 타입 longblob, 숙소이미지
		reservation_number: number; // 예약번호
		reservation_status: number; // 예약상태
		reservation_start_date: string; // 예약시작날짜
		accom_name: string; // 숙소명
		room_category: string; // 객실 종류
		room_price: number; // 객실 가격
	};
}

const ReservationList: React.FC<Reservation> = ({ reservation }) => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'cancel', modalSize: modalSize }));
	};

	// function cancelReservation(e: any): string {
	// 	<Modal>

	// 	</Modal>
	// }
	return (
		<ReservationWrapper>
			<div className="reservationbox">
				<div className="item_reservation_date">{reservation.reservation_start_date}</div>
				<div className="item_reser_button">
					<button onClick={modalOpen}>예약취소</button>
				</div>
			</div>
			<ReservationContainer>
				<DetailContainer>
					<ImageBox>
						<img src={accomodation} className="imagebox"></img>
					</ImageBox>
					<DetailBox>
						<div className="detailbox">
							<div className="item_reservation_number">
								<p>예약번호</p>
							</div>
							<div className="item_reser_number">{reservation.reservation_number}</div>
							<div className="item_reservation_status">
								<span>예약상태</span>
							</div>
							<div className="item_reser_status">{reservation.reservation_status}</div>
							<div className="item_reser_name">{reservation.accom_name}</div>
							<div className="item_room_cate">{reservation.room_category}</div>
							<div className="item_room_price">{reservation.room_price}원</div>
						</div>
					</DetailBox>
				</DetailContainer>
				<CollapseContainer>
					{/* <Divider orientation="left">Small Size</Divider> */}
					<Collapse
						size="small"
						ghost={true}
						bordered={false}
						items={[
							{
								key: '1',
								label: '상세정보',
								children: (
									<BriefHouse
										house={{
											name: '가나다',
											price: '100000원',
											rating: 4.0,
											location: '서울',
											image: accomodation,
										}}
									/>
								),
							},
						]}
					/>
				</CollapseContainer>
			</ReservationContainer>
		</ReservationWrapper>
	);
};

export default ReservationList;

const ReservationWrapper = styled.div`
	margin: 0.5rem;
	padding: 0.5rem;
	border: solid 1.5px ${color.color1};
	border-radius: 0.5rem;
	//background-color: blue;
	display: inline-flex;
	flex-direction: column;
	position: static;
	z-index: 1;

	.reservationbox {
		display: grid;
		grid-template-columns: 50fr 50fr;
	}

	.reservationbox {
		color: ${color.color1};
		padding-left: 1rem;
		text-align: left;
		font-weight: bold;
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
			font-size: 1.2rem;
			transition: width 0.1s;
		}

		.item_reser_button button {
			font-size: 1rem;
			transition: width 0.1s;
		}

		.item_reser_button button:hover {
			font-size: 1rem;
			transition: width 0.1s;
		}
	}

	// TODO : 반응형 추가
	@media (min-width: 360px) and (max-width: 540px) {
		width: 80vw;
	}

	@media (min-width: 540px) and (max-width: 768px) {
		width: 65vw;
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		width: 52vw;
	}

	@media (min-width: 1024px) {
		width: 30vw;
	}
`;

const ReservationContainer = styled.div`
	margin-top: 1rem;
	//background-color: gray;
`;

const DetailContainer = styled.div`
	display: inline-flex;
`;

const CollapseContainer = styled.div`
	display: grid;
	//background-color: ${color.color5};
	.ant-collapse-header-text {
		color: ${color.color1};
		text-align: left;
		font-size: 1.2vw;
		align-self: center;
	}
	.ant-collapse-content-box {
		color: ${color.color1};
		text-align: justify;
		padding: 0px;
		/* position: absolute;
		z-index: 1; */
		background-color: ${color.backColor};
	}

	.ant-collapse-expand-icon {
		color: ${color.color1};
		align-items: right;
	}

	.ant-collapse-content-active {
		position: absolute;
		z-index: 2;
	}

	@media (max-width: 360px) {
		.ant-collapse-content-box {
			width: 80vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.ant-collapse-content-box {
			width: 75vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.ant-collapse-content-box {
			width: 60vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.ant-collapse-content-box {
			width: 47vw;
			display: inline-flex;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.ant-collapse-content-box {
			width: 28vw;
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
			width: 30vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.imagebox {
			width: 25vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.imagebox {
			width: 30vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.imagebox {
			width: 25vw;
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
	// background-color: orange;

	.detailbox {
		display: grid;
		grid-template-columns: 65px 70fr;
		grid-template-rows: repeat(5, 10fr);
		//background-color: orange;
	}

	.item_reservation_number {
		align-self: center;
	}

	.item_reser_number {
		align-self: center;
	}

	.item_reservation_status {
		align-self: center;
	}

	.item_reser_status {
		align-self: center;
	}

	.item_reser_name {
		grid-column-start: 1;
		grid-column-end: 3;
		align-self: center;
	}

	.item_room_cate {
		grid-column-start: 1;
		grid-column-end: 3;
		align-self: center;
	}

	.item_room_price {
		font-weight: bold;
		align-self: center;
	}

	@media (max-width: 360px) {
		.detailbox {
			width: 50vw;
			font-size: 0.3rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 360px) and (max-width: 540px) {
		.detailbox {
			width: 40vw;
			font-size: 0.3rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.detailbox {
			width: 30vw;
			font-size: 0.5rem;
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
			width: 17vw;
			font-size: 0.9rem;
			transition: width 0.1s;
		}
	}
`;
