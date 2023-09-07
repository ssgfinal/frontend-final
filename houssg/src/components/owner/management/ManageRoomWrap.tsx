import { RoomList } from '../../../assets/constant/reservationDummy';
import RoomCompToggler from './element/RoomCompToggler';
const ManageRoomWrap = () => {
	return (
		<div>
			{RoomList.map((room) => (
				<RoomCompToggler room={room} key={room.room_number} />
			))}
		</div>
	);
};

export default ManageRoomWrap;
