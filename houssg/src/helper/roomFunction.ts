import api from '../api/api';
import { roomUrl } from '../assets/constant';

const getTargetRoomData = async (accomNumber: number) => {
	return await api.get(roomUrl.roomList + '?accomNumber=' + accomNumber);
};

export { getTargetRoomData };
