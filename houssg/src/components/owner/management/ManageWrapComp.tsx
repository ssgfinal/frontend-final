import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { ManageHouseRead } from '.';
import ManageHouseEdit from './ManageHouseEdit';

const ManageWrapComp = () => {
	const [isEditMode, setIsEditMode] = useState(false);

	console.log(isEditMode, 'isEditMode');
	return (
		<HouseInfoWrapper>
			{!isEditMode ? <ManageHouseRead setIsEditMode={setIsEditMode} /> : <ManageHouseEdit setIsEditMode={setIsEditMode} />}
		</HouseInfoWrapper>
	);
};

export default ManageWrapComp;

const HouseInfoWrapper = styled.div`
	border: 2px solid ${color.color2};
	margin: 1rem 0;
`;
