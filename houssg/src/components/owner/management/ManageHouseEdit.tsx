// import { useState } from 'react';
import { HouseTabContainer, ManageReadTitle, NavClickComp, color, devideOnce } from '../../../assets/styles';
import { styled } from 'styled-components';
import { SetStateToggle } from '../../../types';
import { houseServiceCategory } from '../../../assets/constant';
import { CheckBox } from '../register/element';

const ManageHouseEdit: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	const checkedList = new Array(houseServiceCategory.length).fill(0);

	return (
		<ManageWrapper>
			<ManageReadTitle>[리조트] 영등포 라이프스타일 F HOTEL</ManageReadTitle>
			<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
			<ManageHouseWrapper>
				<ManageHouseContainer>
					<ManageHouseEditTitle>전화번호</ManageHouseEditTitle>
					<ManageHouseInput type="number" placeholder="예시) 01012345678" />
					<ManageHouseEditTitle>입퇴실 시간</ManageHouseEditTitle> <ManageHouseCheckinInput type="time" />
					<ManageHouseSpan>&amp;</ManageHouseSpan>
					<ManageHouseCheckoutInput type="time" />
					<ManageHouseEditTitle>시설 및 서비스</ManageHouseEditTitle>
					<CheckBoxContainer>
						{houseServiceCategory.map((service, i) => (
							<CheckBox key={service.value} element={service} index={i} checkedList={checkedList} />
						))}
					</CheckBoxContainer>
					{/* TODO: 상세설명 글자수 제한은 있는지? */}
					<ManageHouseEditTitle>상세설명</ManageHouseEditTitle> <ManageHouseText rows={8} />
				</ManageHouseContainer>
			</ManageHouseWrapper>
			<HouseTabContainer>
				<NavClickComp>수정완료</NavClickComp>
				<NavClickComp onClick={() => setIsEditMode(false)}>취소하기</NavClickComp>
			</HouseTabContainer>
		</ManageWrapper>
	);
};

export default ManageHouseEdit;

const ManageWrapper = styled.div`
	max-width: 40rem;
	@media (min-width: 500px) {
		padding: 0 5vw 0 5vw;
	}
`;

const HouseImg = styled.img`
	max-width: 20rem;
	margin-bottom: 0.5rem;
	object-fit: contain;
	border-radius: 0.5rem;
	@media screen and (max-width: ${devideOnce.first}) {
		max-width: none;
		width: 23rem;
	}

	@media (max-width: 300px) {
		width: 85%;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 500px) {
		width: 80%;
		transition: width 0.2s;
	}
`;

const ManageHouseWrapper = styled.div`
	text-align: left;
	padding: 0.3rem;
`;

const ManageHouseContainer = styled.div`
	display: grid;

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const ManageHouseEditTitle = styled.span`
	grid-column-start: 1;
	grid-column-end: 5;
	justify-self: left;
	padding: 2vw 0 2vw 0;
	color: ${color.color1};
	font-weight: bold;

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const CheckBoxContainer = styled.div`
	color: ${color.darkGrayColor};
	grid-column-start: 1;
	grid-column-end: 6;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-bottom: 1vw;
	/* 
	@media (min-width: 800px) {
		width: 25rem;
	} */
`;

const ManageHouseCheckinInput = styled.input`
	grid-column-start: 1;
	grid-column-end: 3;
	height: 2rem;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	outline: none;

	@media (max-width: 300px) {
		height: 1.3rem;
		font-size: 0.5rem;
	}
`;

const ManageHouseSpan = styled.span`
	color: ${color.darkGrayColor};
	justify-self: center;
	align-self: center;
`;

const ManageHouseCheckoutInput = styled.input`
	grid-column-start: 4;
	grid-column-end: 6;
	height: 2rem;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	outline: none;

	@media (max-width: 300px) {
		width: 100%;
		height: 1.3rem;
		font-size: 0.5rem;
	}
`;

const ManageHouseInput = styled.input`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	grid-column-start: 1;
	grid-column-end: 6;

	outline: none;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	background-color: transparent;
	resize: none;
	height: 2rem;

	@media (max-width: 300px) {
		height: 1.3rem;
		font-size: 0.5rem;
		text-align: center;
	}
`;

const ManageHouseText = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 6;
	outline: none;
	color: ${color.darkGrayColor};
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	background-color: transparent;
	resize: none;

	&::-webkit-scrollbar {
		display: none;
	}
	&::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;
