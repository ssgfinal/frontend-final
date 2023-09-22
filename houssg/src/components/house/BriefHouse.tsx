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
			<Img src={house.image} className="imagebox" />
			<HouseContainer>
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
				</HouseDetailContainer>
				<PriceBox>
					<div>{house.price.toLocaleString()}원</div>
				</PriceBox>
			</HouseContainer>
		</BriefHouseWrapper>
	);
};

export default BriefHouse;

const BriefHouseWrapper = styled.div`
	cursor: pointer;
	margin: 1rem;
	padding: 1rem;
	align-items: center;
`;

const HouseDetailContainer = styled.div`
	text-align: left;
`;

const HouseContainer = styled.div`
	align-items: center;
`;

const Img = styled.img`
	margin: 0.5;
	width: 100%;

	&:hover {
		width: 95%;
		transition: width 0.2s;
	}
`;

const RateBox = styled.div`
	width: 70%;
	text-align: left;
`;

const PriceBox = styled.div`
	text-align: right;
	font-size: 1rem;
`;
