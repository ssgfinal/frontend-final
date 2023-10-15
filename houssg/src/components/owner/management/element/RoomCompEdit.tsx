import { useRef, useState } from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';
import { color, flexCenter } from '../../../../assets/styles';
import { roomKey, roomServiceCategory } from '../../../../assets/constant';
import { CheckBox } from '../../register/element';
import { ImageUploader, RoomImgSlider } from '../../../common';
import { useFocusRef } from '../../../../hooks';
import { base64ToFile, doRefFocus } from '../../../../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTargetRoom, returnRoomFormData } from '../../../../helper';

const RoomCompEdit: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const queryClient = useQueryClient();

	const [checkedList, setCheckedList] = useState<number[]>(room.service);
	const newRoomCategory = useRef<HTMLInputElement | null>(null);
	const newRoomCount = useRef<HTMLInputElement | null>(null);
	const newRoomPrice = useRef<HTMLInputElement | null>(null);
	const [roomImgs, setRoomImgs] = useState<string[]>(room.imgs);
	const [roomImgFiles, setRoomImgFiles] = useState<File[]>([]);
	const [isListUploading, setIsListUploading] = useState(false);
	const sliderFocusRef = useRef<HTMLDivElement | null>(null);

	useFocusRef(newRoomCategory, []);

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
		doRefFocus(sliderFocusRef);
	};

	const onAddRoomImgFile = (data: string) => {
		setRoomImgFiles([...roomImgFiles, base64ToFile(data, room.accomNumber + '')]);
	};

	const { mutate } = useMutation({
		mutationFn: (formData: FormData) => editTargetRoom(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [roomKey.targetRoom, room.accomNumber] });
			alert('성공');
			setIsEditMode(false);
		},
		onError: () => {
			alert('실패');
		},
	});

	const onRoomEdit = () => {
		const roomCategoryValue = newRoomCategory.current?.value;
		const roomCountValue = newRoomCount.current?.value;
		const roomPriceValue = newRoomPrice.current?.value;
		const houseId = room.accomNumber + '';
		const resistImage = roomImgs.filter((imageUrl) => imageUrl.startsWith('http'));
		const roomNumber = room.roomNumber + '';
		if (
			roomCategoryValue === room.roomCategory &&
			roomCountValue === room.roomAvailability + '' &&
			roomPriceValue === room.roomPrice + '' &&
			resistImage.length === room.imgs.length &&
			!roomImgFiles.length &&
			checkedList === room.service
		) {
			setIsEditMode(false);
			return;
		}

		const formData = returnRoomFormData({
			roomCountValue,
			roomCategoryValue,
			roomPriceValue,
			roomImgFiles,
			houseId,
			roomNumber,
			checkedList,
			resistImage,
		});
		if (formData === 'false') {
			return;
		}

		mutate(formData);
	};

	return (
		<RoomEditWrapper>
			<InstructionText>객실 수정중...</InstructionText>
			{!isListUploading && roomImgs.length !== 0 && (
				<SliderContainer ref={sliderFocusRef}>
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
			<RoomEditContainer>
				<RoomEditTitle>종류</RoomEditTitle>
				<RoomEditInput type="text" defaultValue={room.roomCategory} ref={newRoomCategory}></RoomEditInput>
				<RoomEditTitle>개수</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.roomAvailability} ref={newRoomCount}></RoomEditInput>
				<RoomEditTitle>가격</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.roomPrice} ref={newRoomPrice}></RoomEditInput>
			</RoomEditContainer>
			<RoomEditDetailTitle>시설 및 서비스</RoomEditDetailTitle>
			<RoomServiceContainer>
				{roomServiceCategory.map((service, i) => (
					<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
				))}
			</RoomServiceContainer>
			<RoomEditCancelButton onClick={onRoomEdit}>수정완료</RoomEditCancelButton>
			<RoomEditCancelButton
				onClick={() => {
					setIsEditMode(false);
				}}
			>
				취소하기
			</RoomEditCancelButton>
		</RoomEditWrapper>
	);
};

export default RoomCompEdit;

const RoomEditWrapper = styled.div`
	margin: 1rem;
	padding: 1rem 0;
	box-shadow: 0px 8px 8px -4px rgba(0, 0, 0, 0.2), 0px -8px 8px -4px rgba(0, 0, 0, 0.2);
`;

const InstructionText = styled.div`
	margin: 1rem auto;
	font-weight: 600;
	font-size: 1.2rem;
`;

const SliderContainer = styled.div<{ $isLoading?: boolean }>`
	width: 100%;
	max-width: 15rem;
	display: ${(props) => props.$isLoading && 'none'};
	margin: 0 auto;
	@media screen and (max-width: 800px) {
		max-width: 18rem;
	}
`;

const RoomEditTitle = styled.div`
	color: ${color.color1};
	font-size: 1rem;
	font-weight: bold;
	grid-column-start: 1;
	grid-column-end: 2;
	justify-self: left;
	align-self: center;

	@media (max-width: 300px) {
		grid-column-start: 1;
		grid-column-end: 3;
		font-size: 0.8rem;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;

const RoomEditDetailTitle = styled.div`
	margin-top: 0.5rem;
	color: ${color.color1};
	font-size: 1rem;
	font-weight: bold;
	justify-self: left;
	align-self: center;
	padding-bottom: 0.3rem;

	@media (max-width: 300px) {
		font-size: 0.8rem;
	}
`;

const RoomEditInput = styled.input`
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

const RoomEditContainer = styled.div`
	display: grid;
	grid-template-columns: 3fr 10fr;
	grid-gap: 0.5rem;
	margin: 1rem;
`;

const RoomServiceContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	color: ${color.darkGrayColor};
	margin-top: 0.5rem;

	@media screen and (max-width: 500px) {
		max-width: 280px;
		margin-inline: auto;
		gap: 0.5rem;
	}
	@media (max-width: 300px) {
		font-size: 0.8rem;
	}
`;

const RoomEditCancelButton = styled.button`
	cursor: pointer;
	border: none;
	font-size: 1.05rem;
	font-weight: 600;
	background-color: ${color.backColor};
	width: 50%;
	padding: 0.8rem;

	&:hover {
		color: ${color.color1};
	}
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
