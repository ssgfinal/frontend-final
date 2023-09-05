import { useState } from 'react';
import { styled } from 'styled-components';
import ManageNav from './ManageNav';
import ManageTabComp from './ManageTabComp';
import { HouseInfoContainer, InfoText, InfoWrapper, SubInfoAligner } from '../../../assets/styles';
import { ManageHouseProps } from '../../../types';

const ManageHouseRead: React.FC<ManageHouseProps> = ({ setIsEditMode }) => {
	const [isRoomSelected, setIsRoomSelected] = useState(true);

	const [isOpenTabComp, setIsOpenTabComp] = useState(false);

	return (
		<>
			<HouseInfoContainer>
				<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
				<InfoWrapper>
					<InfoText>이름 : 영등포 라이프스타일 F HOTEL </InfoText>
					<InfoText>전화번호 : 0350500001</InfoText>
					<SubInfoAligner>
						<InfoText>숙소종류 : 호텔</InfoText>
						<InfoText>입실/퇴실 시간 : 15:00/13:00 </InfoText>
					</SubInfoAligner>
					<InfoText>사업자 번호 : 1000000001</InfoText>
					<InfoText>주소 : 3333333333</InfoText>
					<InfoText>시설 및 서비스</InfoText>
					<InfoText>상세설명 : 여기는 000입니다. 어서오세요. 반갑습니다. 굿굿굿굿굿굿굿</InfoText>
				</InfoWrapper>
			</HouseInfoContainer>

			<ManageNav
				isRoomSelected={isRoomSelected}
				setSelectedNav={setIsRoomSelected}
				setIsOpenTabComp={setIsOpenTabComp}
				isOpenTabComp={isOpenTabComp}
				setIsEditMode={setIsEditMode}
			/>
			{isOpenTabComp && <ManageTabComp isRoomSelected={isRoomSelected}></ManageTabComp>}
		</>
	);
};

export default ManageHouseRead;

const HouseImg = styled.img`
	width: 20rem;
	margin-bottom: 0.5rem;
`;
