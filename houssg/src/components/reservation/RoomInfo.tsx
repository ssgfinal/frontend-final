import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { BookableRoomCnt, SelectedReservationType } from '../../types';
import Calendar from './Calendar';

interface RoomInfoProps {
	initBookableRoomList: BookableRoomCnt[];
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}

const arePropsEqual = (prevProps: RoomInfoProps, nextProps: RoomInfoProps) => {
	return (
		// prevProps.initBookableRoomList === nextProps.initBookableRoomList &&
		prevProps.selectedReservation.startDate === nextProps.selectedReservation.startDate &&
		prevProps.selectedReservation.endDate === nextProps.selectedReservation.endDate
	);
};

const RoomInfo: React.FC<RoomInfoProps> = React.memo(({ initBookableRoomList, selectedReservation, setSelectedReservation }) => {
	const location = useLocation();
	const room = location.state.room;
	const houseName = location.state.houseName;

	console.log('RoomInfo 컴포넌트 실행');
	return (
		<ReservationCommonBox>
			<UserReservationTitle>객실 정보</UserReservationTitle>
			<UserReservationLeft>{houseName}</UserReservationLeft>
			<UserReservationLeft>{room.roomCategory}</UserReservationLeft>
			<UserReservationLeft>
				<div>1박당 {Number(room.roomPrice).toLocaleString()}원</div>
			</UserReservationLeft>
			<UserReservationLeft>
				예약 날짜
				<Calendar
					initBookableRoomList={initBookableRoomList}
					selectedReservation={selectedReservation}
					setSelectedReservation={setSelectedReservation}
				/>
			</UserReservationLeft>
		</ReservationCommonBox>
	);
}, arePropsEqual);

export default RoomInfo;
