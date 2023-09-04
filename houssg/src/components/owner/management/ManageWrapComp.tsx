import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../assets/styles';
import ManageNav from './ManageNav';
import ManageTabComp from './ManageTabComp';

const ManageWrapComp = () => {
	const [isRoomSelected, setIsRoomSelected] = useState(true);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isOpenTabComp, setIsOpenTabComp] = useState(false);
	return (
		<HouseInfoWrapper>
			{!isEditMode && (
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
			)}
			<ManageNav
				isRoomSelected={isRoomSelected}
				setSelectedNav={setIsRoomSelected}
				setIsOpenTabComp={setIsOpenTabComp}
				isOpenTabComp={isOpenTabComp}
				setIsEditMode={setIsEditMode}
			/>
			{isOpenTabComp && <ManageTabComp isRoomSelected={isRoomSelected}></ManageTabComp>}
		</HouseInfoWrapper>
	);
};

export default ManageWrapComp;

const HouseInfoWrapper = styled.div`
	border: 2px solid ${color.color2};
	margin: 1rem 0;
`;
const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.5vw;
	/* align-items: center; */

	padding: 0.5rem;
`;

const HouseImg = styled.img`
	width: 20rem;
`;

const InfoWrapper = styled.div`
	margin-top: 0.6rem;
	display: flex;
	flex-direction: column;
	text-align: left;
	gap: 0.3rem;
`;

const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5vw;
`;

const InfoText = styled.div`
	font-size: 1rem;
`;
