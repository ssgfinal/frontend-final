import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { SelectedReservationType } from '../../types';

interface RoomInfoProps {
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ selectedReservation, setSelectedReservation }) => {
	const location = useLocation();
	const room = location.state.room;
	const houseName = location.state.houseName;

	useEffect(() => {
		setSelectedReservation({
			...selectedReservation,
			night: 2,
		});
	}, []);

	return (
		<ReservationCommonBox>
			<UserReservationTitle>객실 정보</UserReservationTitle>
			<UserReservationLeft>{houseName}</UserReservationLeft>
			<UserReservationLeft>{room.roomCategory}</UserReservationLeft>
			<UserReservationLeft> 예약 가능 날짜 및 시간 (feat. 달력)</UserReservationLeft>
			<UserReservationLeft>
				<div>1박당 {Number(room.roomPrice).toLocaleString()}원</div>
			</UserReservationLeft>
		</ReservationCommonBox>
	);
};

export default RoomInfo;
