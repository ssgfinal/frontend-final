// import { useState } from 'react';
import { HouseTabContainer, InfoText, InfoWrapper, ManageReadTitle, NavClickComp, color, devideOnce } from '../../../assets/styles';
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
				<ManageHouseContainer>
					<InfoText>
						<ManageHouseTelBox>
							<ManageHouseEditTitle>전화번호</ManageHouseEditTitle>
							<ManageHouseInput type="number" />
						</ManageHouseTelBox>
					</InfoText>
					<InfoText>
						<ManageHouseTimeBox>
							<ManageHouseEditTitle>입퇴실 시간</ManageHouseEditTitle> <ManageHouseCheckinInput type="time" />
							<span> &amp; </span>
							<ManageHouseCheckoutInput type="time" />
						</ManageHouseTimeBox>
					</InfoText>
					<InfoText>
						<ManageHouseEditTitle>시설 및 서비스</ManageHouseEditTitle>
					</InfoText>
					<CheckBox>
						<CheckboxGroup list={plainOptions} />
					</CheckBox>
					<InfoText>
						<ManageHouseBox>
							<ManageHouseEditTitle>상세설명</ManageHouseEditTitle> <ManageHouseText />
						</ManageHouseBox>
					</InfoText>
				</ManageHouseContainer>
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

const ManageHouseContainer = styled.div`
	width: 100%;
	display: grid;
	justify-self: center;
`;

const ManageHouseTelBox = styled.div`
	justify-content: left;
	display: grid;
`;

const ManageHouseTimeBox = styled.div`
	width: 30rem;
	display: grid;
	justify-content: left;
`;

const ManageHouseEditTitle = styled.div`
	width: 7rem;
	padding-bottom: 2vw;
	color: ${color.color1};
	font-weight: bold;
`;

const CheckBox = styled.div`
	input[type='checkbox']:checked {
		width: 15px;
		height: 15px;
	}
`;

const ManageHouseBox = styled.div`
	display: grid;
`;

const ManageHouseCheckinInput = styled.input`
	grid-column-start: 2;
	grid-column-end: 3;
	height: 2rem;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	justify-self: left;
	outline: none;
`;

const ManageHouseCheckoutInput = styled.input`
	grid-column-start: 4;
	grid-column-end: 5;
	height: 2rem;
	justify-self: left;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	outline: none;
`;

const ManageHouseInput = styled.input`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	grid-column-start: 2;
	grid-column-end: 3;
	outline: none;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	background-color: transparent;
	resize: none;
	height: 2rem;
`;

const ManageHouseText = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 3;
	outline: none;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.4rem;
	background-color: transparent;
	resize: none;

	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar {
		height: 5px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${color.unSelectColor};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0px 0px 5px ${color.backColor};
	}
`;
