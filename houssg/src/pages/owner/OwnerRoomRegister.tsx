import { useState } from 'react';
import styled from 'styled-components';
import { RegiHeadText, color, flexCenter } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';
import { base64ToFile } from '../../utils';
import { useParams } from 'react-router';
import { CheckBox } from '../../components/owner/register/element';
import { roomServiceCategory } from '../../assets/constant';

const OwnerRoomRegister = () => {
	const { houseId } = useParams();
	const [houseImgs, setHouseImgs] = useState<string[]>([]);
	const [houseImgFiles, setHouseImgFiles] = useState<File[]>([]);

	const [isListUploading, setIsListUploading] = useState(false);
	const [checkedList, setCheckedList] = useState<number[]>(new Array(roomServiceCategory.length).fill(0));

	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

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
			<RegiHeadText>객실 등록하기</RegiHeadText>
			<RegisterInputWrapper>
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실 사진</RegiRoomSubTitle>
					{!isListUploading && houseImgs.length !== 0 && (
						<SliderContainer>
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
					<RegiRoomSubTitle>객실 정보</RegiRoomSubTitle>
					<InputGridAligner $service>
						<RegiRoomSubText>서비스</RegiRoomSubText>
						<CheckBoxContainer>
							{roomServiceCategory.map((service, i) => (
								<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
							))}
						</CheckBoxContainer>
					</InputGridAligner>
					<InputGridAligner>
						<RegiRoomSubText>종류</RegiRoomSubText>
						<InputStyler></InputStyler>
					</InputGridAligner>
					<InputGridAligner>
						<RegiRoomSubText>방 개수</RegiRoomSubText>
						<InputStyler></InputStyler>
					</InputGridAligner>
					<InputGridAligner>
						<RegiRoomSubText>가격</RegiRoomSubText>
						<InputStyler></InputStyler>
					</InputGridAligner>
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
	padding: 0.5rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1rem;
	padding-left: 1rem;
`;
const RegiRoomSubTitle = styled.div`
	margin-top: 1.5rem;
	font-size: 1.25rem;
	font-weight: 600;
	color: ${color.color2};
	margin-bottom: 1.5rem;
`;

const RegiRoomSubText = styled.div`
	font-size: 1rem;
	font-weight: 600;
`;

const InputGridAligner = styled.div<{ $service?: true }>`
	width: 80%;
	display: grid;
	grid-template-columns: 4fr 6fr;
	align-items: ${(props) => !props.$service && 'center'};
	margin-bottom: 1rem;
	@media screen and (max-width: 1000px) {
		grid-template-columns: 3fr 7fr;
	}
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

const CheckBoxContainer = styled.div`
	color: ${color.darkGrayColor};
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: 1rem;
	padding-bottom: 1rem;
	max-width: 18rem;
	@media screen and (max-width: 600px) {
		gap: 0.7rem;
		font-size: 0.8rem;
		max-width: 10rem;
	}
`;

const InputStyler = styled.input`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&:hover {
		border: 1px solid ${color.color2};
		outline: 2px solid ${color.color2};
	}

	grid-column-start: 2;
	grid-column-end: 3;
	justify-self: left;
	width: 70%;
	outline: none;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	color: ${color.darkGrayColor};
	background-color: transparent;
	resize: none;
	height: 2rem;
	text-align: center;

	@media (max-width: 300px) {
		grid-column-start: 1;
		grid-column-end: 3;
		height: 1.3rem;
		width: 100%;
		font-size: 0.8rem;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		width: 100%;
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;
