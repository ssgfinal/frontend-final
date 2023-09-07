import React from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';

const RoomCompEdit: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	return (
		<div>
			<RoomImg src={room.room_image} />
			<div>객실 가격 : {room.room_price}</div>
			<div>객실 종류 : {room.room_category}</div>
			<div>객실 갯수 : </div>
			<div>객실 설명 : {room.room_detail}</div>{' '}
			<button
				onClick={() => {
					setIsEditMode(false);
				}}
			>
				수정 취소
			</button>
		</div>
	);
};

export default RoomCompEdit;

const RoomImg = styled.img`
	width: 10vw;
`;
