import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { ManageHouseEdit, ManageHouseRead } from '.';

const ManageWrapComp = () => {
	const [isEditMode, setIsEditMode] = useState(false);

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
