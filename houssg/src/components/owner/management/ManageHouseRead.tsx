import { useState } from 'react';
import { styled } from 'styled-components';

import { HouseInfoContainer, InfoText, InfoTitleText, InfoWrapper, NavClickComp, SubInfoAligner, color, devideOnce } from '../../../assets/styles';
import { ManageNav, ManageTabComp } from '.';
import { MyHouseDataHandleComp } from '../../../types';
import { MapMarker, moreIcon } from '../../../assets/icons';
import { houseServiceCategory } from '../../../assets/constant';

const ManageHouseRead: React.FC<MyHouseDataHandleComp> = ({ house, setIsEditMode }) => {
	const [isRoomSelected, setIsRoomSelected] = useState(0); // 처음 0 room 1 , review 2
	const [isOpenTabComp, setIsOpenTabComp] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	console.log(house.service, '서비스');
	return (
		<ManageWrapper>
			<TitleContainer>
				<ManageReadTitle>
					[{house.accomCategory}] {house.accomName}
				</ManageReadTitle>
				<DropdownBox>
					<MoreBox src={moreIcon} onClick={toggleDropdown}></MoreBox>
					{isDropdownOpen && (
						<ButtonAligner>
							<NavClickComp
								onClick={() => {
									setIsEditMode(true);
									setIsOpenTabComp(false);
								}}
							>
								수정하기
							</NavClickComp>
							<NavClickComp>삭제하기</NavClickComp>
						</ButtonAligner>
					)}
				</DropdownBox>
			</TitleContainer>
			<HouseInfoContainer>
				<HouseImg src={house.img} />
				<InfoWrapper>
					<InfoTitleText>전화번호</InfoTitleText>
					<ManageReadSubTitle>{house.teleNumber}</ManageReadSubTitle>
					<InfoTitleText>입/퇴실 시간</InfoTitleText>
					<ManageReadSubTitle>
						{house.checkIn}/{house.checkOut}
					</ManageReadSubTitle>
					<InfoTitleText>사업자 번호</InfoTitleText>
					<ManageReadSubTitle>{house.businessNumber}</ManageReadSubTitle>
					<ManageReadAddress>
						<img src={MapMarker} />
						{house.accomAddress}
					</ManageReadAddress>
				</InfoWrapper>
			</HouseInfoContainer>
			<SubInfoAligner>
				<InfoTitleText>시설 및 서비스</InfoTitleText>
				<ServiceContainer>
					{/* {house.service.map((able, i) => {
						return <ManageReadService key={i} src={houseServiceCategory[i].icon}></ManageReadService>;
					})} */}
					{house.service.map((able, i) => {
						if (i >= 0 && i < houseServiceCategory.length && able) {
							return <ManageReadService key={i} src={houseServiceCategory[i].icon}></ManageReadService>;
						}
						return null; // 혹은 다른 fallback 로직을 적용할 수 있음
					})}
				</ServiceContainer>
				<InfoTitleText>상세설명</InfoTitleText>
				<InfoText>{house.accomDetails}</InfoText>
			</SubInfoAligner>
			<ManageNav
				isRoomSelected={isRoomSelected}
				setSelectedNav={setIsRoomSelected}
				setIsOpenTabComp={setIsOpenTabComp}
				isOpenTabComp={isOpenTabComp}
			/>
			{isOpenTabComp && <ManageTabComp isRoomSelected={isRoomSelected} />}
		</ManageWrapper>
	);
};

export default ManageHouseRead;

const ManageWrapper = styled.div`
	max-width: 35rem;
	margin: auto;
`;

const TitleContainer = styled.div`
	display: grid;
	grid-template-columns: 25fr 1fr;
	padding-top: 0.5rem;
	margin-bottom: 1rem;
`;

const DropdownBox = styled.div`
	position: relative;
`;

const MoreBox = styled.img`
	grid-column-start: 2;
	grid-column-end: 3;
	justify-self: right;
	align-self: center;
	width: 2rem;
	cursor: pointer;

	@media (max-width: 400px) {
		width: 1rem;
		transition: width 0.2s;
	}
`;

const ManageReadTitle = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	justify-self: center;
	align-self: center;
	text-align: center;
	font-size: 1.3rem;
	font-weight: 700;
	color: ${color.color1};

	@media (max-width: 300px) {
		font-size: 0.8rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 500px) {
		font-size: 1rem;
	}
`;

const ManageReadSubTitle = styled.div`
	font-size: 0.9rem;
	white-space: pre-wrap;
	padding: 0 0 0.3rem 0;

	@media (min-width: 300px) and (max-width: 800px) {
		grid-column-start: 2;
		grid-column-end: 3;
	}

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		font-size: 0.8rem;
	}
`;

const ManageReadAddress = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	padding: 0.5rem 0 0.5rem 0;
	img {
		width: 0.7rem;
	}

	@media (max-width: 300px) {
		font-size: 0.8rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 800px) {
		grid-column-start: 1;
		grid-column-end: 3;
		font-size: 1rem;
	}
`;

const HouseImg = styled.img`
	max-width: 20rem;
	margin: auto;
	border-radius: 0.5rem;

	@media screen and (max-width: ${devideOnce.first}) {
		max-width: none;
		width: 27rem;
	}
	@media (max-width: 2000px) {
		width: 80%;
		transition: width 0.2s;
	}
`;

const ServiceContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem 0;
	gap: 1rem;
`;

const ManageReadService = styled.img`
	width: 2rem;

	@media (max-width: 300px) {
		width: 1rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		width: 1.5rem;
	}
`;

const ButtonAligner = styled.div`
	background-color: ${color.backColor};
	border: 1px solid ${color.color1};
	border-radius: 0.5rem;
	padding: 0.5rem;
	box-shadow: 0 0 3px 1px ${color.color1};
	width: 90px;
	position: absolute;
	right: 5px;

	@media (max-width: 300px) {
		width: 85px;
		transition: width 0.2s;
	}
`;
