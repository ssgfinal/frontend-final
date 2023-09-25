import { useState } from 'react';
import { styled } from 'styled-components';

import { HouseInfoContainer, InfoText, InfoTitleText, InfoWrapper, NavClickComp, SubInfoAligner, color, devideOnce } from '../../../assets/styles';
import { ManageNav, ManageTabComp } from '.';
import { SetStateToggle } from '../../../types';

const ManageHouseRead: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	const [isRoomSelected, setIsRoomSelected] = useState(0); // 처음 0 room 1 , review 2
	const [isOpenTabComp, setIsOpenTabComp] = useState(false);

	return (
		<>
			<ManageReadTitle>[리조트] 영등포 라이프스타일 F HOTEL</ManageReadTitle>
			<HouseInfoContainer>
				<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
				<InfoWrapper>
					<InfoText>
						<InfoTitleText>전화번호 : </InfoTitleText>0350500001
					</InfoText>

					<InfoText>
						<InfoTitleText>입실/퇴실 시간 : </InfoTitleText>15:00/13:00
					</InfoText>
					<InfoText>
						<InfoTitleText>사업자 번호 : </InfoTitleText>1000000001
					</InfoText>
					<InfoText>
						<InfoTitleText>주소 : </InfoTitleText>3333333333
					</InfoText>
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
				</InfoWrapper>
			</HouseInfoContainer>
			<SubInfoAligner>
				<DetailText>상세설명</DetailText>
				<InfoTitleText>시설 및 서비스</InfoTitleText>
				<InfoText>
					여기는 000입니다. 어서오세요. 반갑습니다. 굿굿굿굿굿굿 아마도 굿 반갑습니다. 굿굿굿굿굿굿 아마도 반갑습니다. 굿굿굿굿굿굿 아마도 반갑습니다.
					굿굿굿굿굿굿 아마도
				</InfoText>
			</SubInfoAligner>
			<ManageNav
				isRoomSelected={isRoomSelected}
				setSelectedNav={setIsRoomSelected}
				setIsOpenTabComp={setIsOpenTabComp}
				isOpenTabComp={isOpenTabComp}
			/>
			{isOpenTabComp && <ManageTabComp isRoomSelected={isRoomSelected} />}
		</>
	);
};

export default ManageHouseRead;

const ManageReadTitle = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;
	color: ${color.color1};
	margin-bottom: 0.8rem;
`;

const HouseImg = styled.img`
	max-width: 20rem;
	margin-bottom: 0.5rem;
	object-fit: contain;
	border-radius: 0.5rem;
	@media screen and (max-width: ${devideOnce.first}) {
		max-width: none;
		width: 27rem;
	}

	@media (max-width: 300px) {
		width: 100%;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 500px) {
		width: 100%;
		transition: width 0.2s;
	}
`;

const DetailText = styled.div`
	font-size: 1.1rem;
	font-weight: 600;
	color: ${color.color1};
	text-align: left;
	padding-left: 1vw;
`;

const ButtonAligner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
`;
