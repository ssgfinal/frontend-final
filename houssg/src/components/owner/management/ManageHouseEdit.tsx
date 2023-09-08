// import { useState } from 'react';
import { HouseTabContainer, InfoText, InfoWrapper, ManageReadTitle, NavClickComp, devideOnce } from '../../../assets/styles';
import { styled } from 'styled-components';
import { SetStateToggle } from '../../../types';
import { CheckboxGroup } from '../../common';

const ManageHouseEdit: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	const plainOptions = ['Apple', 'Pear', 'Orange'];

	return (
		<>
			<ManageReadTitle>[리조트] 영등포 라이프스타일 F HOTEL</ManageReadTitle>
			<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
			<InfoWrapper>
				<InfoText>
					전화번호 : <input />
				</InfoText>
				<InfoText>
					입실/퇴실 시간 : <input /> <input />
				</InfoText>
				<InfoText>시설 및 서비스</InfoText>
				<CheckboxGroup list={plainOptions} />
				<InfoText>
					상세설명 : <textarea />
				</InfoText>
			</InfoWrapper>
			<HouseTabContainer>
				<NavClickComp>수정완료</NavClickComp>
				<NavClickComp onClick={() => setIsEditMode(false)}>취소하기</NavClickComp>
			</HouseTabContainer>
		</>
	);
};

export default ManageHouseEdit;

const HouseImg = styled.img`
	max-width: 20rem;
	margin-bottom: 0.5rem;
	object-fit: contain;
	border-radius: 0.5rem;
	@media screen and (max-width: ${devideOnce.first}) {
		max-width: none;
		width: 23rem;
	}
`;
