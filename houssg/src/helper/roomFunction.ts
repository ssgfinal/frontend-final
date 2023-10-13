import api from '../api/api';
import { roomUrl } from '../assets/constant';
import { AddRoomProps } from '../types';

const getTargetRoomData = async (accomNumber: number) => {
	return await api.get(roomUrl.roomList + '?accomNumber=' + accomNumber);
};

const addTargetRoom = async (formData: FormData) => {
	return await api.post(roomUrl.roomAdd, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const returnAddRoomFormData = ({ roomCountValue, roomCategoryValue, roomPriceValue, houseImgFiles, houseId, checkedList }: AddRoomProps) => {
	if (houseId) {
		alert('잘못된 접근입니다.');
		return 'false';
	}

	if (!roomCountValue && !roomCategoryValue && !roomPriceValue && !houseImgFiles.length) {
		alert('빈 값이 존재합니다.');
		return 'false';
	}

	const formData = new FormData();

	houseImgFiles.forEach((file) => {
		formData.append('multiFile', file);
	});

	const requestData = {
		accomNumber: houseId,
		roomCategory: roomCategoryValue,
		roomPrice: roomPriceValue,
		roomAvailability: roomCountValue,
		roomServiceDto: checkedList,
	};

	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);
	return formData;
};

export { getTargetRoomData, addTargetRoom, returnAddRoomFormData };
