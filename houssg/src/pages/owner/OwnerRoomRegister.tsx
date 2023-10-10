import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RegiHeadText, flexCenter } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';

const OwnerRoomRegister = () => {
	const { houseId } = useParams();

	const [houseImgs, setHouseImgs] = useState<string[]>([]);
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
				<div>객실종류</div>
				<div>객실 사진</div>

				<SliderContainer>
					<RoomImgSlider data={houseImgs} setData={onEditHouseImgs}>
						<ImageUploader
							width="320px"
							height="240px"
							setImage={onAddHouseImg}
							setImgFile={() => {
								console.log('TODO: 하기');
							}}
						>
							<div>업로드</div>
						</ImageUploader>
					</RoomImgSlider>
				</SliderContainer>
				<br />
				<div>객실 서비스</div>
				<div>방 개수</div>
				<div>객실 가격</div>
			</RegisterInputWrapper>
			<br />
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
	margin-top: 0.5rem;
`;

const SliderContainer = styled.div`
	width: 40vw;
	height: 30vw;

	@media screen and (min-width: 1250px) {
		width: 500px;
		height: 375px;
	}
`;
