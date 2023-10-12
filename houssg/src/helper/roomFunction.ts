import api from '../api/api';
import { roomUrl } from '../assets/constant';

const getTargetRoomData = async (accomNumber: number) => {
	return await api.get(roomUrl.roomList + '?accomNumber=' + accomNumber);
};

const addTargetRoom = async (formData: FormData) => {
	return await api.post(roomUrl.roomAdd, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export { getTargetRoomData, addTargetRoom };
