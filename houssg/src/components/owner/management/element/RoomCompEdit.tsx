import { useRef, useState } from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';
import { color } from '../../../../assets/styles';
import { roomServiceCategory } from '../../../../assets/constant';
import { CheckBox } from '../../register/element';
import { RoomImgSlider } from '../../../common';
import { useFocusRef } from '../../../../hooks';

const RoomCompEdit: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const [checkedList, setCheckedList] = useState<number[]>(new Array(roomServiceCategory.length).fill(0));
	const newRoomCategory = useRef<HTMLInputElement | null>(null);
	const newRoomCount = useRef<HTMLInputElement | null>(null);
	const newRoomPrice = useRef<HTMLInputElement | null>(null);

	useFocusRef(newRoomCategory, []);

	const onChangeCheckedList = (index: number, value: number) => {
		const newCheckedList = [...checkedList];
		newCheckedList[index] = value;
		setCheckedList([...newCheckedList]);
	};

	const onRoomEdit = () => {
		const newCategory = newRoomCategory.current?.value;
		const newCount = newRoomCount.current?.value;
		const newPrice = newRoomPrice.current?.value;
		//TODO: 수정 추가 후, 콘솔 지우기
		console.log(newCategory, newCount, newPrice);
	};

	return (
		<RoomEditWrapper>
			<InstructionText>객실 수정...</InstructionText>
			<SliderContainer>
				<RoomImgSlider data={room.imgs}></RoomImgSlider>
			</SliderContainer>
			<RoomEditContainer>
				<RoomEditTitle>종류</RoomEditTitle>
				<RoomEditInput type="text" defaultValue={room.roomCategory} ref={newRoomCategory}></RoomEditInput>
				<RoomEditTitle>개수</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.roomAvailability} ref={newRoomCount}></RoomEditInput>
				<RoomEditTitle>가격</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.roomPrice} ref={newRoomPrice}></RoomEditInput>
				<RoomEditDetailTitle>시설 및 서비스</RoomEditDetailTitle>
				<RoomServiceContainer>
					{roomServiceCategory.map((service, i) => (
						<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
					))}
				</RoomServiceContainer>
			</RoomEditContainer>
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
	margin-top: 0.3rem;
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
	grid-column-start: 1;
	grid-column-end: 3;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	color: ${color.darkGrayColor};

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
