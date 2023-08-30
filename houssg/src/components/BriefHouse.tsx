import React from 'react';
import { accomodation } from '../assets/icons';

interface House {
	house: {
		name: string;
		price: string;
		rating: number;
		location: string;
	};
}

const BriefHouse: React.FC<House> = ({ house }) => {
	return (
		<div style={{ width: '20rem' }}>
			<img src={accomodation} style={{ maxWidth: '100%' }} />
			{house.name} 찜하기 컴포넌트
			<br />
			평점 컴포넌트
			<br />
			{house.price} {house.location}
		</div>
	);
};

export default BriefHouse;
