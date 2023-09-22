import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { color } from '../../assets/styles/theme';

interface RoomProps {
	room: {
		id: number;
		img: string;
		icon: string[];
		type: string;
		service: string;
		price: number;
	};
}

export const RoomDetail: React.FC<RoomProps> = ({ room }) => {
	const navigate = useNavigate();

	// 숫자를 1000 단위로 포맷하는 함수
	const formatNumber = (value: number) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<Wrapper>
			<RommImg src={room.img} />
			<Info>
				<Type>{room.type}</Type>
				<div>
					{room.icon.map((iconSrc, index) => (
						<React.Fragment key={index}>
							<Icon src={iconSrc} />
							&nbsp;&nbsp;&nbsp;
						</React.Fragment>
					))}
				</div>
				<Between>
					<Center>{formatNumber(room.price)}원</Center>
					<Button
						onClick={() => {
							navigate(`/user/reservation/${room.id}`);
						}}
					>
						예약하기
					</Button>
				</Between>
			</Info>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem;
	border-radius: 1rem;
	display: grid;
	grid-gap: 1rem;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const RommImg = styled.img`
	width: 100%;
	border-radius: 1rem;
`;

const Info = styled.div`
	display: grid;
	text-align: left;
	grid-template-rows: repeat(3, 1fr);
	grid-gap: 1rem;
	align-items: center;
`;

const Type = styled.div`
	font-weight: bolder;
	font-size: large;
`;

const Icon = styled.img`
	width: 2rem;
`;

const Between = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Center = styled.div`
	@media (min-width: 950px) {
		width: 65%;
	}

	@media (max-width: 950px) {
		width: 55%;
	}

	align-self: center;
`;

const Button = styled.button`
	&:hover {
		cursor: pointer;
	}
	@media (min-width: 950px) {
		width: 35%;
	}

	@media (max-width: 950px) {
		width: 45%;
	}
	height: 2.5rem;
	background-color: ${color.color2};
	border: none;
	border-radius: 1rem;
	color: white;
`;
