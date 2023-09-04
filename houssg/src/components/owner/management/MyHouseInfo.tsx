import styled from 'styled-components';
import { color } from '../../../assets/styles';

const MyHouseInfo = () => {
	return (
		<HouseInfoContainer>
			<HouseImg>대충 이미지</HouseImg>
			<InfoWrapper>
				<SubInfoAligner>
					<div>이름 : 신라호텔3호 </div>
					<div>주소 : 3333333333</div>
					<div>전화번호 : 052-2323-2323</div>
				</SubInfoAligner>
				<SubInfoAligner>
					<div>호텔</div>
					<div>입실 시간 15:00 퇴실 시간 13:00 </div>
					<div>사업자 번호</div>
				</SubInfoAligner>
				<SubInfoAligner>
					<div>시설 및 서비스</div>
					<div>상세설명</div>
				</SubInfoAligner>
			</InfoWrapper>
			<div>객실 추가하기 버튼</div>
			<div>수정 및 삭제버튼</div>

			<div>
				<div>객실 명</div>
				<div>객실 갯수</div>
				<div>객실 사진</div>
				<div>금액 </div>
				<div>객실 상세정보</div>
				<div>수정 및 삭제 버튼</div>
			</div>
			<div>리뷰관련</div>
		</HouseInfoContainer>
	);
};

export default MyHouseInfo;

const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1.5vw;
	/* justify-content: center; */
	align-items: center;
	margin: 1rem auto;
	border: 2px solid ${color.color2};
	padding: 0.5rem;
`;

const HouseImg = styled.div`
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
