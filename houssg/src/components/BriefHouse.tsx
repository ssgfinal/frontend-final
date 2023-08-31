import React from 'react';
import Rating from './common/Rating';

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
		<div>
			<div style={{ textAlign: 'left' }}>
				<img src={house.image} style={{ width: '100%', padding: '5px 5px 5px 5px' }} />
				<span>
					{house.location}&nbsp;
					{house.name}
				</span>
				&nbsp;<input type="checkbox"></input>
				<br />
				<Rating rate={house.rating} readonly />
			</div>
			<div style={{ textAlign: 'right', fontSize: '1.3rem' }}>{house.price}</div>
		</div>
	);
};

export default BriefHouse;
