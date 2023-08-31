import { styled } from 'styled-components';
import { Collapse, Divider } from 'antd';

import React from 'react';
import { color } from '../assets/styles';
import accomodation from '../assets/icons/숙소대표이미지1.jpg';
import BriefHouse from './BriefHouse';

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
	return (
		<ReservationWrapper>
			<div className="ReservationDate">{reservation.reservation_start_date}</div>
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
							<div className="item_room_price">{reservation.room_price}</div>
						</div>
					</DetailBox>
				</DetailContainer>
				<CollapseContainer>
					{/* <Divider orientation="left">Small Size</Divider> */}
					<Collapse
						size="small"
						bordered={false}
						items={[
							{
								key: '1',
								label: '상세정보',
								children: (
									<BriefHouse
										house={{
											name: '가나다',
											price: '100000',
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
	border: solid 1px ${color.color1};
	border-radius: 0.5rem;
	//background-color: gray;
	display: inline-flex;
	flex-direction: column;

	.ReservationDate {
		color: ${color.color1};
		text-align: left;
		padding-left: 1rem;
	}

	@media (max-width: 540px) {
		.ReservationDate {
			width: 42vw;
			font-size: 0.8rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.ReservationDate {
			width: 42vw;
			font-size: 0.9rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.ReservationDate {
			width: 42vw;
			font-size: 1rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.ReservationDate {
			width: 45vw;
			font-size: 1.4rem;
			transition: width 0.1s;
		}
	}

	// TODO : 반응형 추가
	@media (max-width: 540px) {
		width: 80vw;
	}

	@media (min-width: 540px) and (max-width: 768px) {
		width: 70vw;
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		width: 70vw;
	}

	@media (min-width: 1024px) {
		width: 55vw;
	}
`;

const ReservationContainer = styled.div`
	margin-top: 1rem;
	// background-color: gray;
`;

const DetailContainer = styled.div`
	display: inline-flex;
`;

const CollapseContainer = styled.div`
	display: flex;
	//background-color: ${color.color5};
	.ant-collapse-header-text {
		color: ${color.color1};
		text-align: left;
	}
	.ant-collapse-content-box {
		color: ${color.color1};
		text-align: justify;
	}
	.ant-collapse-expand-icon {
		color: ${color.color1};
	}
`;

const ImageBox = styled.div`
	display: inline-flex;
	flex-direction: row;
	padding-right: 0.5rem;
	transition: width 0.1s;
	@media (max-width: 540px) {
		.imagebox {
			width: 30vw;
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
			width: 15vw;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.imagebox {
			width: 20vw;
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
		grid-template-columns: 20fr 70fr;
		grid-template-rows: repeat(5, 50fr);
		//background-color: orange;
	}

	.item_reser_name {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.item_room_cate {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.item_room_price {
		grid-column-start: 1;
		grid-column-end: 3;
		text-align: right;
	}

	@media (max-width: 540px) {
		.detailbox {
			width: 10vw;
			font-size: 0.3rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.detailbox {
			width: 13vw;
			font-size: 0.5rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.detailbox {
			width: 20vw;
			font-size: 0.7rem;
			transition: width 0.1s;
		}
	}

	@media (min-width: 1024px) {
		.detailbox {
			width: 25vw;
			font-size: 0.9rem;
			transition: width 0.1s;
		}
	}
`;
