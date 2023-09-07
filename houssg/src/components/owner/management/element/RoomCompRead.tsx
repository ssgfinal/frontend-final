import React from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';

const RoomCompRead: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	return (
		<RoomContainer>
			<RoomImg src={room.room_image} />
			<div>
				<div>객실 가격 : {room.room_price}</div>
				<div>객실 종류 : {room.room_category}</div>
				<div>객실 갯수 : </div>
				<div>객실 설명 : {room.room_detail}</div>
			</div>
			<button onClick={() => setIsEditMode(true)}>수정하기</button>
		</RoomContainer>
	);
};

export default RoomCompRead;

const RoomImg = styled.img`
	width: 10vw;
`;

const RoomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
