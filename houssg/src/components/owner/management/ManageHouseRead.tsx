import { useState } from 'react';
import { styled } from 'styled-components';

import { HouseInfoContainer, InfoText, InfoTitleText, InfoWrapper, SubInfoAligner, devideOnce } from '../../../assets/styles';
import { ManageHouseProps } from '../../../types';
import { ManageNav, ManageTabComp } from '.';

const ManageHouseRead: React.FC<ManageHouseProps> = ({ setIsEditMode }) => {
	const [isRoomSelected, setIsRoomSelected] = useState(true);

	const [isOpenTabComp, setIsOpenTabComp] = useState(false);

	return (
		<>
			<HouseInfoContainer>
				<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
				<InfoWrapper>
					<InfoText>
						<InfoTitleText>이름 : </InfoTitleText>영등포 라이프스타일 F HOTEL
					</InfoText>
					<InfoText>
						<InfoTitleText>전화번호 : </InfoTitleText>0350500001
					</InfoText>
					<SubInfoAligner>
						<InfoText>
							<InfoTitleText>숙소종류 : </InfoTitleText>리조트
						</InfoText>
						<InfoText>
							<InfoTitleText>입실/퇴실 시간 : </InfoTitleText>15:00/13:00
						</InfoText>
					</SubInfoAligner>
					<InfoText>
						<InfoTitleText>사업자 번호 : </InfoTitleText>1000000001
					</InfoText>
					<InfoText>
						<InfoTitleText>주소 : </InfoTitleText>3333333333
					</InfoText>
					<InfoText>
						<InfoTitleText>시설 및 서비스</InfoTitleText>
					</InfoText>
					<InfoTitleText>상세설명</InfoTitleText>
					<InfoText>
						여기는 000입니다. 어서오세요. 반갑습니다. 굿굿굿굿굿굿 아마도 굿 반갑습니다. 굿굿굿굿굿굿 아마도 반갑습니다. 굿굿굿굿굿굿 아마도
						반갑습니다. 굿굿굿굿굿굿 아마도
					</InfoText>
				</InfoWrapper>
			</HouseInfoContainer>

			<ManageNav
				isRoomSelected={isRoomSelected}
				setSelectedNav={setIsRoomSelected}
				setIsOpenTabComp={setIsOpenTabComp}
				isOpenTabComp={isOpenTabComp}
				setIsEditMode={setIsEditMode}
			/>
			{isOpenTabComp && <ManageTabComp isRoomSelected={isRoomSelected} />}
		</>
	);
};

export default ManageHouseRead;

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
