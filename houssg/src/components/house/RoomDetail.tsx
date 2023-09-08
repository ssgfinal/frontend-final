import React from 'react';
import styled from 'styled-components';

import { color } from '../../assets/styles/theme';

interface RoomProps {
	room: {
		id: number;
		img: string;
		type: string;
		service: string;
		price: number;
	};
}

export const RoomDetail: React.FC<RoomProps> = ({ room }) => {
	// 숫자를 1000 단위로 포맷하는 함수
	const formatNumber = (value: number) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<Wrapper>
			<RommImg src={room.img} />
			<Type>{room.type}</Type>
			<div>{room.service}</div>
			<div>{formatNumber(room.price)}원</div>
			<Button>예약하기</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem;
	border-radius: 1rem;
	display: grid;
	text-align: left;
	grid-template-columns: 1fr;
	grid-gap: 1rem;

	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const RommImg = styled.img`
	justify-self: center;
	width: 100%;
	height: 100%;
	border-radius: 1rem;
`;

const Type = styled.div`
	font-weight: bolder;
	font-size: large;
`;

const Button = styled.button`
	height: 2.5rem;
	background-color: ${color.color2};
	border: none;
	border-radius: 1rem;
	color: white;
`;
