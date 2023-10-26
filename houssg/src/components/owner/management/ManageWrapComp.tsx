import { useState } from 'react';
import styled from 'styled-components';

import { color } from '../../../assets/styles';
import { ManageHouseEdit, ManageHouseRead } from '.';
import { MyHouseData } from '../../../types';

const ManageWrapComp: React.FC<{ house: MyHouseData }> = ({ house }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const { addRequest, deletionRequest } = house;

	const approveState = ['등록', '요청중', '거절'];
	const regiState = deletionRequest === 1 ? '삭제요청중' : approveState[addRequest] || '알 수 없음';

	return (
		<HouseRegiStateContainer>
			<HouseRegiStater>{regiState}</HouseRegiStater>
			<HouseInfoWrapper>
				{!isEditMode ? (
					<ManageHouseRead house={house} setIsEditMode={setIsEditMode} />
				) : (
					<ManageHouseEdit house={house} setIsEditMode={setIsEditMode} />
				)}
			</HouseInfoWrapper>
		</HouseRegiStateContainer>
	);
};

export default ManageWrapComp;

const HouseRegiStateContainer = styled.div`
	margin-top: 1rem;
	position: relative;
	padding-top: 1.4rem;
`;

const HouseInfoWrapper = styled.div`
	border: 2px solid ${color.color1};
	padding: 0.5rem;
	border-radius: 15px;
	@media screen and(max-width:800px) {
		border-radius: 10px;
	}
`;

const HouseRegiStater = styled.div`
	position: absolute;
	width: 20%;
	min-width: 5rem;
	background-color: ${color.backColor};
	border: 2px solid ${color.color1};
	border-radius: 10px;
	height: 1.4rem;
	top: 0.7rem;
	left: 7%;
	font-size: 0.9rem;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
`;
