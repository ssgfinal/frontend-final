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
	border: 2px solid ${color.color1};
	margin: 1rem 0rem;
	padding: 0.5rem;
	border-radius: 15px;

	@media screen and(max-width:800px) {
		border-radius: 10px;
	}
`;
