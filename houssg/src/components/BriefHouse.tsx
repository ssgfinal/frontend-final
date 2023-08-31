import { styled } from 'styled-components';

import React from 'react';
import { color } from '../assets/styles';

interface House {
	house: {
		name: string;
		price: string;
		rating: number;
		location: string;
		image: string;
	};
}

const BriefHouse: React.FC<House> = ({ house }) => {
	return (
		<BriefHouseWrapper>
			<ImageBox>
				<img src={house.image} className="imagebox" />
			</ImageBox>
			<HouseContainer>
				<HouseDetailContainer>
					<div>
						<span>
							{house.location}&nbsp;
							{house.name}
						</span>
						<input type="checkbox"></input>
					</div>
					<RateBox>
						<div>*****&nbsp;{house.rating}</div>
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
