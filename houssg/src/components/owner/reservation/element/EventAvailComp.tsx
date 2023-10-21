import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../hooks';
import { ownerHouseId, reservableRoomInfo } from '../../../../store/redux/calendarSlice';
import { ownerKey } from '../../../../assets/constant';
import { getRoomReservableDays } from '../../../../helper';

const EventAvailComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const { date, roomId, roomName, amount } = useAppSelector(reservableRoomInfo);
	const { isLoading, data, isSuccess, isError, error } = useQuery([ownerKey.roomReservableDays, houseId], () => getRoomReservableDays(roomId, date), {
		cacheTime: 2 * 60 * 1000, // 5분
		staleTime: 3 * 60 * 1000, // 2분
	});
	isSuccess && console.log(data.data);
	isError && console.log(error);
	return (
		<div>
			<div>
				{roomName} : {amount}
			</div>
			<div>{date}</div>
			<div>예약자</div>
			<div>{isLoading}</div>
			{isSuccess && (
				<>
					<div>최대 숙박 기간{data.data.length}</div>
					<div>최대 숙박일 : {data.data[data.data.length - 1]}</div>
				</>
			)}
		</div>
	);
};

export default EventAvailComp;
