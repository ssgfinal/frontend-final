import api from '../api/api';
import { roomUrl } from '../assets/constant';
import { AddRoomProps } from '../types';

const getTargetRoomData = async (accomNumber: number) => {
	return await api.get(roomUrl.roomList + '?accomNumber=' + accomNumber);
};

const addTargetRoom = async (formData: FormData) => {
	return await api.post(roomUrl.roomAdd, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const editTargetRoom = async (formData: FormData) => {
	return await api.patch(roomUrl.roomEdit, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const returnRoomFormData = ({
	roomCountValue,
	roomCategoryValue,
	roomPriceValue,
	roomImgFiles,
	houseId,
	checkedList,
	roomNumber,
	resistImage,
}: AddRoomProps) => {
	if (!houseId) {
		alert('잘못된 접근입니다.');
		return 'false';
	}

	if (!roomCountValue && !roomCategoryValue && !roomPriceValue && !roomImgFiles.length) {
		alert('빈 값이 존재합니다.');
		return 'false';
	}

	const formData = new FormData();

	roomImgFiles.forEach((file) => {
		formData.append('multiFile', file);
	});
	const requestData = {
		accomNumber: houseId,
		roomCategory: roomCategoryValue,
		roomPrice: roomPriceValue,
		roomAvailability: roomCountValue,
		roomServiceDto: checkedList,
		roomNumber,
		resistImage,
	};
	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);
	return formData;
};

export { getTargetRoomData, addTargetRoom, returnRoomFormData, editTargetRoom };
