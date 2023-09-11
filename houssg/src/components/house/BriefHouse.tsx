import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Rating from '../common/Rating';

interface House {
	house: {
		houseId: number;
		name: string;
		price: string;
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
			<ImageBox>
				<img src={house.image} className="imagebox" />
			</ImageBox>
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
					<div>{house.price}</div>
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

const ImageBox = styled.div`
	padding: 0.5;
	align-items: center;

	.imagebox:hover {
		width: 95%;
		transition: width 0.2s;
	}

	@media (max-width: 540px) {
		.imagebox {
			width: 100%;
		}
	}

	@media (min-width: 540px) and (max-width: 768px) {
		.imagebox {
			width: 100%;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.imagebox {
			width: 100%;
		}
	}

	@media (min-width: 1024px) {
		.imagebox {
			width: 100%;
		}
	}
`;

const RateBox = styled.div`
	text-align: left;
`;

const PriceBox = styled.div`
	text-align: right;
	font-size: 1rem;
`;
