import { useState } from 'react';
import styled from 'styled-components';
import { RegiHeadText, color, flexCenter } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';
import { base64ToFile } from '../../utils';
import { useParams } from 'react-router';

const OwnerRoomRegister = () => {
	const [houseImgs, setHouseImgs] = useState<string[]>([]);
	const [houseImgFiles, setHouseImgFiles] = useState<File[]>([]);
	const [isListUploading, setIsListUploading] = useState(false);
	const { houseId } = useParams();

	const onEditHouseImgs = (index: number) => {
		setHouseImgs((prevHouseImg) => {
			return prevHouseImg.filter((_, i) => i !== index);
		});
		setHouseImgFiles((prevHouseFile) => {
			return prevHouseFile.filter((_, i) => i !== index);
		});
	};

	const onAddHouseImg = (data: string) => {
		setHouseImgs([...houseImgs, data]);
	};

	const onAddHouseImgFile = (data: string) => {
		setHouseImgFiles([...houseImgFiles, base64ToFile(data, houseId + '')]);
	};

	return (
		<RoomRegisterWrap>
			<RegiHeadText>객실 등록</RegiHeadText>
			<RegisterInputWrapper>
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실사진</RegiRoomSubTitle>
					{houseImgs.length !== 0 && (
						<SliderContainer $isLoading={isListUploading}>
							<RoomImgSlider data={houseImgs} setData={onEditHouseImgs}></RoomImgSlider>
						</SliderContainer>
					)}
					{/*TODO: 이미지 작아졌을 때 */}
					<ImageUploader width="320px" height="240px" setImage={onAddHouseImg} setImgFile={onAddHouseImgFile} setIsListUploading={setIsListUploading}>
						{houseImgs.length === 0 ? (
							<SliderContainer>
								<SliderContainerInnerAligner>이미지 등록</SliderContainerInnerAligner>
							</SliderContainer>
						) : (
							houseImgs.length < 10 && <div>추가 업로드</div>
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

const SliderContainer = styled.div<{ $isLoading?: boolean }>`
	width: 95%;
	max-width: 400px;
	display: ${(props) => props.$isLoading && 'none'};
`;

const SliderContainerInnerAligner = styled.div`
	${flexCenter}
	width: 100%;
	height: 100%;
	border: 1px solid #ccc;
	border-radius: 10px;
	min-height: 400px;
	min-width: 280px;
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
