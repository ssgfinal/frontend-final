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
			<ImageBox>
				<img src={house.image} className="imagebox" />
			</ImageBox>
			<HouseBox2>
				<span>
					{house.location}&nbsp;
					{house.name}
				</span>
				&nbsp;<input type="checkbox"></input>
				<RateBox>
					<br />
					<p>*****&nbsp;{house.rating}</p>
				</RateBox>
			</HouseBox2>
			<div style={{ textAlign: 'right', fontSize: '1.3rem' }}>{house.price}</div>
		</HouseBox1>
	);
};

export default BriefHouse;

const HouseBox1 = styled.div`
	margin: 1rem;
`;

const HouseBox2 = styled.div`
	display: flex;
	justify-content: left;
	text-align: left;
	margin: 1rem;
`;

const ImageBox = styled.div`
	padding: 1rem;
	width: 20vw;
	height: 15vw;
	.imagebox {
		width: 100%;
		height: 100%;
	}
`;

const RateBox = styled.div`
	text-align: left;
`;
