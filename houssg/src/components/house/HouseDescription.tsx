import React from 'react';
import { useParams } from 'react-router-dom';

export const HouseDescription = () => {
	const { houseId } = useParams();
	return (
		<div>
			HouseInfo
			<br />
			하우스 번호 : {houseId}{' '}
		</div>
	);
};
