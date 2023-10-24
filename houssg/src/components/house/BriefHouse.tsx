import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Rating from '../common/Rating';
import { HouseProps } from '../../types';
import { userRoute } from '../../assets/constant';

const BriefHouse: React.FC<HouseProps> = ({ house }) => {
	const navigate = useNavigate();

	return (
		<ScreenBox>
			<BriefHouseWrapper>
				<HoverContainer
					onClick={() => {
						navigate(userRoute.houseDetail + house.accomNumber);
					}}
				>
					<HouseImg src={house.img} />
					<HoverBox></HoverBox>
				</HoverContainer>

				<HouseDetailContainer>
					<div>{house.accomName}</div>
					<div>{house.accomAddress}</div>
					<RateBox>
						<Rating rate={house.avgRating} readonly />
					</RateBox>
					<PriceBox>
						<div>{house.minPrice.toLocaleString()}원</div>
					</PriceBox>
				</HouseDetailContainer>
			</BriefHouseWrapper>
		</ScreenBox>
	);
};

export default BriefHouse;

const ScreenBox = styled.div``;

const BriefHouseWrapper = styled.div`
	display: flex;
	flex-direction: column;

	margin: 1rem;
	padding: 0.5rem;
	text-align: left;

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}
`;

const HouseDetailContainer = styled.div`
	padding: 0 1rem 1rem 1rem;
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 0.4rem;
	@media (max-width: 380px) {
		font-size: 0.5rem;
	}

	@media (max-width: 540px) {
		font-size: 0.8rem;
	}
`;

// TODO: 숙소 이미지 hover시 지나가는 효과
const HoverContainer = styled.div`
	padding: 1rem;
	position: relative;
	overflow: hidden;

	&:hover div {
		background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.7));
		transition: 1s;
		left: calc(50% + 380px);
		opacity: 1;
	}
`;

const HouseImg = styled.img`
	cursor: pointer;
	width: 100%;
	border-radius: 0.8rem;
	aspect-ratio: 4/3;
`;

// TODO: 숙소 이미지 hover시 지나가는 효과
const HoverBox = styled.div`
	position: absolute;
	background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
	width: 50px;
	height: 600px;
	transform: rotateZ(30deg);
	top: -100px;
	left: -130px;
	transition: 0.1s;
	opacity: 0.5;
`;

const RateBox = styled.div`
	width: 70%;
	text-align: left;
	font-size: 1rem;
	line-height: 1rem;
	margin-bottom: 0.3rem;

	@media (max-width: 320px) {
		font-size: 0.5rem;
		ul {
			margin-right: -15vw;
			font-size: 0.7rem;
		}
	}
`;

const PriceBox = styled.div`
	align-self: flex-end;
	text-align: right;
	font-weight: bold;
	font-size: 1rem;

	@media (max-width: 380px) {
		font-size: 0.5rem;
	}

	@media (max-width: 540px) {
		font-size: 0.8rem;
	}
`;
