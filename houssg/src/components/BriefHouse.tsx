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
	console.log('컴포넌트에 들어옴:');
	console.log('house:' + house);
	return (
		<div style={{ width: '300px' }}>
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
