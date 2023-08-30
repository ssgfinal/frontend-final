import React from 'react';
import { styled } from 'styled-components';

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
							<span>
								{house.location}&nbsp;
								{house.name}
							</span>
							<input type="checkbox"></input>
						</HouseBox2>
						<RateBox>
							<p>*****&nbsp;{house.rating}</p>
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
	width: 15vw;
	margin: 1rem;
	align-items: center;
`;

const HouseBox2 = styled.div`
	text-align: left;
	align-items: center;
`;

const HouseBox3 = styled.div`
	align-items: center;
`;

const HouseBox4 = styled.div`
	align-items: center;
`;

const HouseBox5 = styled.div`
	margin-left: 1rem;
	align-items: center;
`;

const ImageBox = styled.div`
	padding: 1rem;
	align-items: center;
	.imagebox {
		width: 13vw;
		height: 13vw;
		align-items: center;
	}
`;

const RateBox = styled.div`
	text-align: left;
`;

const PriceBox = styled.div`
	width: 15vw;
	margin-right: 0rem;
	text-align: right;
	font-size: 1rem;
`;
