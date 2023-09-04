import styled from 'styled-components';
import { color } from '../../../assets/styles';

const MyHouseInfo = () => {
	return (
		<HouseInfoWrapper>
			<HouseInfoContainer>
				<HouseImg src='https://a.cdn-hotels.com/gdcs/production62/d1770/50e9f242-6f67-48a5-9b77-82aa6d64d78a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium","zip_numbe' />
				<InfoWrapper>
					<SubInfoAligner>
						<div>이름 : 영등포 라이프스타일 F HOTEL </div>
						<div>전화번호 : 0350500001</div>
					</SubInfoAligner>
					<SubInfoAligner>
						<div>호텔</div>
						<div>입실 시간 15:00 퇴실 시간 13:00 </div>
						<div>사업자 번호 : 1000000001</div>
					</SubInfoAligner>
					<SubInfoAligner>
						<div>주소 : 3333333333</div>
					</SubInfoAligner>
					<SubInfoAligner>
						<div>시설 및 서비스</div>
					</SubInfoAligner>
					<SubInfoAligner>
						<div>여기는 000입니다. 어서오세요. 반갑습니다. 굿굿굿굿굿굿굿</div>
					</SubInfoAligner>
				</InfoWrapper>
			</HouseInfoContainer>
			<HouseInfoDetailNav>
				<div>객실 정보</div>
				<div>리뷰 확인</div>
				<div>객실 추가하기</div>
				<div>수정 및 삭제</div>
			</HouseInfoDetailNav>
			<TabContainer>
				{/* <div>객실 명</div>
				<div>객실 갯수</div>
				<div>객실 사진</div>
				<div>금액 </div>
				<div>객실 상세정보</div>
				<div>수정 및 삭제 버튼</div> */}
			</TabContainer>
		</HouseInfoWrapper>
	);
};

export default MyHouseInfo;

const HouseInfoWrapper = styled.div`
	border: 2px solid ${color.color2};
	margin: 1rem 0;
`;
const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.5vw;
	/* justify-content: center; */
	align-items: center;

	padding: 0.5rem;
`;

const HouseImg = styled.img`
	background-color: red;
	width: 26rem;
	height: 15rem;
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: row;
`;

const HouseInfoDetailNav = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 0.5rem;
`;

const TabContainer = styled.div``;
