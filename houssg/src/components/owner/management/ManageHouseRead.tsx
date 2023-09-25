import { useState } from 'react';
import { styled } from 'styled-components';

import { HouseInfoContainer, InfoText, InfoTitleText, InfoWrapper, NavClickComp, SubInfoAligner, color, devideOnce } from '../../../assets/styles';
import { ManageNav, ManageTabComp } from '.';
import { SetStateToggle } from '../../../types';
import { MapMarker, moreIcon, seaview } from '../../../assets/icons';

const ManageHouseRead: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	const [isRoomSelected, setIsRoomSelected] = useState(0); // 처음 0 room 1 , review 2
	const [isOpenTabComp, setIsOpenTabComp] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<ManageWrapper>
			<TitleContainer>
				<ManageReadTitle>[리조트] 영등포 라이프스타일 F HOTEL</ManageReadTitle>
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
				<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
				<InfoWrapper>
					<InfoTitleText>전화번호</InfoTitleText>
					<ManageReadSubTitle>0350500001</ManageReadSubTitle>
					<InfoTitleText>입/퇴실 시간</InfoTitleText>
					<ManageReadSubTitle>15:00/13:00</ManageReadSubTitle>
					<InfoTitleText>사업자 번호</InfoTitleText>
					<ManageReadSubTitle>123-45-67890</ManageReadSubTitle>
					<ManageReadAddress>
						<img src={MapMarker} />
						강원도 영월군 무릉도원면 명마동길 44-37
					</ManageReadAddress>
				</InfoWrapper>
			</HouseInfoContainer>
			<SubInfoAligner>
				<InfoTitleText>시설 및 서비스</InfoTitleText>
				<ManageReadService src={seaview}></ManageReadService>
				<InfoTitleText>상세설명</InfoTitleText>
				<InfoText>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad architecto doloremque repudiandae culpa nulla a alias quasi temporibus similique
					ex. Aliquam dolores quas pariatur consectetur itaque suscipit provident nobis earum!
				</InfoText>
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

const ManageReadService = styled.img`
	width: 3rem;
	padding-bottom: 0.5rem;

	@media (max-width: 300px) {
		width: 2rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		width: 2.5rem;
	}
`;

const ButtonAligner = styled.div`
	background-color: ${color.backColor};
	border: 1px solid ${color.color1};
	border-radius: 0.5rem;
	padding: 0.5rem;
	box-shadow: 0 0 3px 1px ${color.color1};
	width: 100px;
	position: absolute;
`;
