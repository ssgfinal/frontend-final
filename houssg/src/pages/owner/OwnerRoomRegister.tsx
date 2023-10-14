import { useRef, useState } from 'react';
import styled from 'styled-components';
import { RegiHeadText, color, flexCenter } from '../../assets/styles';
import { ImageUploader, RoomImgSlider } from '../../components/common';
import { base64ToFile } from '../../utils';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../../components/owner/register/element';
import { ownerRoute, roomKey, roomServiceCategory } from '../../assets/constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTargetRoom, returnRoomFormData } from '../../helper';

const OwnerRoomRegister = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { houseId } = useParams();
	const [roomImgs, setRoomImgs] = useState<string[]>([]);
	const [roomImgFiles, setRoomImgFiles] = useState<File[]>([]);
	const [checkedList, setCheckedList] = useState<number[]>(new Array(roomServiceCategory.length).fill(0));
	const roomCategory = useRef<HTMLInputElement | null>(null);
	const roomCount = useRef<HTMLInputElement | null>(null);
	const roomPrice = useRef<HTMLInputElement | null>(null);

	const [isListUploading, setIsListUploading] = useState(false);

	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

	const onEditRoomImgs = (index: number) => {
		setRoomImgs((prevRoomImg) => {
			return prevRoomImg.filter((_, i) => i !== index);
		});
		setRoomImgFiles((prevHouseFile) => {
			return prevHouseFile.filter((_, i) => i !== index);
		});
	};

	const onAddRoomImg = (data: string) => {
		setRoomImgs([...roomImgs, data]);
	};

	const onAddRoomImgFile = (data: string) => {
		setRoomImgFiles([...roomImgFiles, base64ToFile(data, houseId + '')]);
	};

	const { mutate } = useMutation({
		mutationFn: (formData: FormData) => addTargetRoom(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [roomKey.targetRoom, houseId] });
			alert('성공');
			navigate(ownerRoute.management);
		},
	});

	const onAddRoom = () => {
		const roomCountValue = roomCount.current?.value;
		const roomCategoryValue = roomCategory.current?.value;
		const roomPriceValue = roomPrice.current?.value;

		const formData = returnRoomFormData({ roomCountValue, roomCategoryValue, roomPriceValue, roomImgFiles, houseId, checkedList });
		if (formData === 'false') {
			return;
		}
		mutate(formData);
	};

	return (
		<RoomRegisterWrap>
			<RegiHeadText>객실 등록하기</RegiHeadText>
			<RegisterInputWrapper>
				<RegiRoomSubComp>
					<RegiRoomSubTitle>객실 사진</RegiRoomSubTitle>
					{!isListUploading && roomImgs.length !== 0 && (
						<SliderContainer>
							<RoomImgSlider data={roomImgs} setData={onEditRoomImgs}></RoomImgSlider>
						</SliderContainer>
					)}
					{/*TODO: 이미지 작아졌을 때 */}
					<ImageUploader width="320px" height="240px" setImage={onAddRoomImg} setImgFile={onAddRoomImgFile} setIsListUploading={setIsListUploading}>
						{roomImgs.length === 0 ? (
							<SliderContainer>
								<SliderContainerInnerAligner>이미지 등록</SliderContainerInnerAligner>
							</SliderContainer>
						) : (
							roomImgs.length < 10 && <MoreImgBtn>추가 업로드</MoreImgBtn>
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
						<InputStyler ref={roomCategory} placeholder="ex) 일반룸"></InputStyler>
					</InputGridAligner>
					<InputGridAligner>
						<RegiRoomSubText>방 개수</RegiRoomSubText>
						<InputStyler type="number" ref={roomCount} min={0} defaultValue={1}></InputStyler>
					</InputGridAligner>
					<InputGridAligner>
						<RegiRoomSubText>가격</RegiRoomSubText>
						<InputStyler type="number" ref={roomPrice} min={0} placeholder="ex) 10000"></InputStyler>
					</InputGridAligner>
				</RegiRoomSubComp>
			</RegisterInputWrapper>
			<SubmitButtonAligner>
				<RegiRoomBtn onClick={onAddRoom}>등록하기</RegiRoomBtn>
				<RegiRoomBtn>취소</RegiRoomBtn>
			</SubmitButtonAligner>
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
	width: 100%;
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
	font-size: 1.35rem;
	font-weight: 600;
	color: ${color.color2};
	margin-bottom: 1.5rem;
`;

const RegiRoomSubText = styled.div`
	font-size: 1rem;
	font-weight: 600;
`;

const MoreImgBtn = styled.div`
	background-color: ${color.color3};
	color: ${color.backColor};
	font-size: 0.9rem;
	padding: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	font-weight: 500;
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
	max-width: 17rem;
	outline: none;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.3rem;
	color: ${color.darkGrayColor};
	background-color: transparent;
	resize: none;
	height: 2rem;
	text-align: center;
`;

const SubmitButtonAligner = styled.div`
	width: 60vw;
	max-width: 1000px;
	min-width: 270px;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	height: 2rem;
	padding-right: 0.5rem;
	@media screen and (min-width: 800px) {
		padding-right: 1rem;
	}
`;

const RegiRoomBtn = styled.div<{ $disable?: boolean }>`
	margin-left: 1rem;
	color: ${color.backColor};
	background-color: ${color.color2};
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-weight: 600;
	opacity: 0.8;
	cursor: ${(props) => (props.$disable ? 'not-allowed' : 'pointer')};
	transition: opacity 0.2s ease;
	&:hover {
		opacity: ${(props) => !props.$disable && 1};
	}
`;
