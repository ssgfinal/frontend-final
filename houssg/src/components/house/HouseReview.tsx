import React from 'react';
import { useParams } from 'react-router-dom';

export const HouseReview = () => {
	const { houseId } = useParams();
	return (
		<div>
			HouseReview
			<br />
			하우스 번호 : {houseId}{' '}
		</div>
	);
};
