import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Rating from '../common/Rating';

interface House {
	house: {
		houseId: number;
		name: string;
		price: number;
		rating: number;
		location: string;
		image: string;
	};
}

const BriefHouse: React.FC<House> = ({ house }) => {
	const navigate = useNavigate();

	return (
		<BriefHouseWrapper
			onClick={() => {
				navigate(`/user/house/${house.houseId}`);
			}}
		>
			<HoverContainer>
				<HouseImg src={house.image} />
				<HoverBox></HoverBox>
			</HoverContainer>

			<HouseDetailContainer>
				<div>
					<span>
						{house.location}&nbsp;
						{house.name}&nbsp;
					</span>
				</div>
				<RateBox>
					<Rating rate={house.rating} readonly />
				</RateBox>
				<PriceBox>
					<div>{house.price.toLocaleString()}원</div>
				</PriceBox>
			</HouseDetailContainer>
		</BriefHouseWrapper>
	);
};

export default BriefHouse;

const BriefHouseWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
	padding: 1rem;
	text-align: left;

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}
`;

const HouseDetailContainer = styled.div`
	margin: 0 1rem 1rem 1rem;
	padding: 0 1rem 1rem 1rem;
`;

const HoverContainer = styled.div`
	margin: 1rem;
	padding: 1rem;
	position: relative;
	overflow: hidden;

	&:hover div {
		background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.7));
		transition: 1s;
		left: calc(50% + 300px);
		opacity: 1;
	}
`;

const HouseImg = styled.img`
	cursor: pointer;
	width: 100%;
	border-radius: 0.8rem;
`;

const HoverBox = styled.div`
	position: absolute;
	background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
	width: 50px;
	height: 450px;
	transform: rotateZ(30deg);
	top: -100px;
	left: -130px;
	transition: 0.1s;
	opacity: 0.5;
`;

const RateBox = styled.div`
	width: 70%;
	text-align: left;
`;

const PriceBox = styled.div`
	align-self: flex-end;
	text-align: right;
	font-weight: bold;
	font-size: 1rem;
`;
