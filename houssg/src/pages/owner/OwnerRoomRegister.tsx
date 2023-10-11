import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RegiHeadText, color, flexCenter } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';

const OwnerRoomRegister = () => {
	const { houseId } = useParams();
	const [houseImgs, setHouseImgs] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const onEditHouseImgs = (index: number) => {
		// houseImgs 배열에서 해당 인덱스의 요소를 제거하고 새 배열을 생성합니다.
		const updatedHouseImgs = [...houseImgs];
		updatedHouseImgs.splice(index, 1);

		// 변경된 배열을 React 상태에 업데이트합니다.
		setHouseImgs(updatedHouseImgs);
	};

	const onAddHouseImg = (data: string) => {
		setHouseImgs([...houseImgs, data]);
	};
	// console.log(houseImgs);
	return (
		<RoomRegisterWrap>
			<RegiHeadText>객실 등록</RegiHeadText>
			<RegisterInputWrapper>
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실사진</RegiRoomSubTitle>

					{!isLoading && houseImgs.length !== 0 && (
						<SliderContainer>
							<RoomImgSlider data={houseImgs} setData={onEditHouseImgs}></RoomImgSlider>
						</SliderContainer>
					)}
					{/*TODO: 이미지 작아졌을 때 */}
					<ImageUploader
						width="320px"
						height="240px"
						setImage={onAddHouseImg}
						setImgFile={() => {
							console.log('TODO: 하기');
						}}
					>
						{houseImgs.length === 0 ? (
							<SliderContainer>
								<SliderContainerInnerAligner>이미지 등록</SliderContainerInnerAligner>
							</SliderContainer>
						) : (
							<div>추가 업로드</div>
						)}
					</ImageUploader>
				</RegiRoomSubComp>
				<br />
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실 서비스</RegiRoomSubTitle>
				</RegiRoomSubComp>
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실 정보</RegiRoomSubTitle>

					<RegiRoomSubText>방 개수</RegiRoomSubText>
					<RegiRoomSubText>객실 가격</RegiRoomSubText>
					<RegiRoomSubText>객실종류</RegiRoomSubText>
				</RegiRoomSubComp>
			</RegisterInputWrapper>
			<div>{houseId}</div>
		</RoomRegisterWrap>
	);
};

export default OwnerRoomRegister;

const RoomRegisterWrap = styled.div`
	margin: 1rem auto;
	max-width: 700px;
	${flexCenter}
	flex-direction: column;
`;

const RegisterInputWrapper = styled.div`
	margin-top: 1.5rem;
`;

const SliderContainer = styled.div`
	width: 95%;
	max-width: 400px;
	/* height: 30vw;
	@media screen and (min-width: 1000px) {
		width: 400px;
		height: 300px;
	} */
`;

const SliderContainerInnerAligner = styled.div`
	${flexCenter}
	width: 100%;
	height: 100%;
	border: 1px solid #ccc;
	border-radius: 10px;
`;

const RegiRoomSubComp = styled.div`
	border-radius: 10px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	width: 60vw;
	max-width: 1000px;
	min-width: 270px;
	padding: 1rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const RegiRoomSubTitle = styled.div`
	font-size: 1.25rem;
	font-weight: 600;
	color: ${color.color1};
	margin-bottom: 1rem;
`;

const RegiRoomSubText = styled.div`
	font-size: 1rem;
`;
