import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { color, HoverText, IconContainer, NoIcon } from '../../assets/styles';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import { isLoginFunc } from '../../utils';
import { RoomDataType, ServiceList } from '../../types';
import { roomServiceCategory } from '../../assets/constant';
import { RoomImgSlider } from '../common';

interface RoomDetailProps {
	room: RoomDataType;
	houseId: string;
	houseName: string;
}
export const RoomDetail: React.FC<RoomDetailProps> = ({ room, houseId, houseName }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [roomServieceList, setRoomServiceList] = useState<ServiceList[]>([]);

	useEffect(() => {
		const updatedServices: ServiceList[] = [];
		room.service &&
			room.service.forEach((existence: number, idx: number) => {
				if (existence === 1) {
					updatedServices.push(roomServiceCategory[idx]);
				}
			});
		setRoomServiceList(updatedServices);
	}, [room]);

	const handleLink = () => {
		const isLogin = isLoginFunc();
		if (!isLogin) {
			const modalSize = window.innerWidth >= 1000 ? 500 : 400;
			dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
		} else {
			navigate(`/user/reservation/${room.roomNumber}`, { state: { room: room, houseId: houseId, houseName: houseName } });
		}
	};

	return (
		<Wrapper>
			<SliderContainer>
				<RoomImgSlider data={room.imgs}></RoomImgSlider>
			</SliderContainer>
			<Info>
				<Type>{room.roomCategory}</Type>
				<div>시설 및 서비스</div>
				<div>
					{roomServieceList.length !== 0 ? (
						roomServieceList.map((service, idx) => (
							<IconContainer key={idx}>
								<Icon src={service.icon} alt={service.text} />
								<HoverText>{service.text}</HoverText>
							</IconContainer>
						))
					) : (
						<NoIcon>미등록</NoIcon>
					)}
				</div>
				<Between>
					<Center>{room.roomPrice.toLocaleString()}원</Center>
					<Button onClick={handleLink}>예약하기</Button>
				</Between>
			</Info>
		</Wrapper>
	);
};

export default RoomDetail;
const Wrapper = styled.div`
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Info = styled.div`
	padding: 0 1.5rem;
	display: grid;
	text-align: left;
	grid-template-rows: repeat(3, 1fr);
	grid-gap: 0.5rem;
	align-items: center;
`;

const Type = styled.div`
	font-weight: bolder;
	font-size: large;
`;

const Icon = styled.img`
	width: 1.7rem;
	margin: 0 0.3rem;
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

const SliderContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	border-radius: 1rem;

	@media screen and (max-width: 800px) {
		max-width: 18rem;
	}
`;
