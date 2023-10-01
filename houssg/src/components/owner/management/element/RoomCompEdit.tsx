import { useRef, useState } from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';
import { color } from '../../../../assets/styles';
import { roomServiceCategory } from '../../../../assets/constant';
import { CheckBox } from '../../register/element';

const RoomCompEdit: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const [checkedList, setCheckedList] = useState<number[]>(new Array(roomServiceCategory.length).fill(0));
	const newRoomCategory = useRef<HTMLInputElement | null>(null);
	const newRoomCount = useRef<HTMLInputElement | null>(null);
	const newRoomPrice = useRef<HTMLInputElement | null>(null);

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
			{/* TODO: 이미지 수정하기, 슬라이더? */}
			<RoomImg src={room.room_image} />
			<RoomEditContainer>
				<RoomEditTitle>종류</RoomEditTitle>
				<RoomEditInput type="text" defaultValue={room.room_category} ref={newRoomCategory}></RoomEditInput>
				<RoomEditTitle>개수</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.room_count} ref={newRoomCount}></RoomEditInput>
				<RoomEditTitle>가격</RoomEditTitle>
				<RoomEditInput type="number" defaultValue={room.room_price} ref={newRoomPrice}></RoomEditInput>
				<RoomEditDetailTitle>시설 및 서비스</RoomEditDetailTitle>
				<RoomServiceContainer>
					{roomServiceCategory.map((service, i) => (
						<CheckBox key={service.value} element={service} index={i} isChecked={!!checkedList[i]} setCheckedList={onChangeCheckedList} />
					))}
				</RoomServiceContainer>
			</RoomEditContainer>
			<RoomEditButton onClick={onRoomEdit}>수정완료</RoomEditButton>
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
`;

const RoomImg = styled.img`
	justify-self: center;
	width: 80%;
	border-radius: 0.5rem;
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
	grid-column-start: 1;
	grid-column-end: 3;
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

const RoomEditButton = styled.button`
	cursor: pointer;
	border: none;
	font-size: 0.8rem;
	font-weight: bold;
	background-color: ${color.backColor};
	width: 50%;
	padding: 0.8rem;

	&:hover {
		color: ${color.color1};
	}
`;

const RoomEditCancelButton = styled.button`
	cursor: pointer;
	border: none;
	font-size: 0.8rem;
	font-weight: bold;
	background-color: ${color.backColor};
	width: 50%;
	padding: 0.8rem;

	&:hover {
		color: ${color.color1};
	}
`;
