import { styled } from 'styled-components';

import React from 'react';

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
		<HouseBox1>
			<HouseBox3>
				<ImageBox>
					<img src={house.image} className="imagebox" />
				</ImageBox>
				<HouseBox4>
					<HouseBox5>
						<HouseBox2>
							<div>
								<span>
									{house.location}&nbsp;
									{house.name}
								</span>
								<input type="checkbox"></input>
							</div>
						</HouseBox2>
						<RateBox>
							<div>*****&nbsp;{house.rating}</div>
						</RateBox>
						<PriceBox>
							<div>{house.price}</div>
						</PriceBox>
					</HouseBox5>
				</HouseBox4>
			</HouseBox3>
		</HouseBox1>
	);
};

export default BriefHouse;

const HouseBox1 = styled.div`
	margin: 1rem;
	align-items: center;
`;

const HouseBox2 = styled.div`
	text-align: left;
`;

const HouseBox3 = styled.div`
	padding: 1rem;
	align-items: center;
`;

const HouseBox4 = styled.div`
	align-items: center;
`;

const HouseBox5 = styled.div`
	align-items: center;
`;

const ImageBox = styled.div`
	padding: 0.5;
	align-items: center;

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
