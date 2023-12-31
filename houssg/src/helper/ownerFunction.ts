import api from '../api/api';
import { ownerUrl, roomUrl } from '../assets/constant';
import { FunnelPropsType } from '../types';

const getMyHouseListData = async () => {
	return await api.get(ownerUrl.myHouseList);
};

const onRegiFunnelData = (data: FunnelPropsType) => {
	// !inactive
	const formData = new FormData();
	if (data.houseImageFile !== null) {
		formData.append('file', data.houseImageFile as File);
	}
	const requestData = {
		accomName: data.name,
		accomAddress: data.targetAddress,
		teleNumber: data.houseNumber,
		accomCategory: data.houseType,
		accomDetails: data.detailText,
		checkIn: data.checkIn,
		checkOut: data.checkOut,
		businessNumber: data.businessNum,
		facilityDto: data.houseService,
	};

	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);
	return api.post(ownerUrl.houseRegister, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const onEditManageHouseApi = (
	accomNumber: number,
	newCheckInValue: string,
	newCheckOutValue: string,
	newDetailValue: string,
	newPhoneNumberValue: string,
	checkedList: number[],
	newImgFile: File | null,
) => {
	const formData = new FormData();
	if (newImgFile !== null) {
		formData.append('file', newImgFile);
	}
	const requestData = {
		accomNumber,
		teleNumber: newPhoneNumberValue,
		accomDetails: newDetailValue,
		checkIn: newCheckInValue,
		checkOut: newCheckOutValue,
		facilityDto: checkedList,
	};

	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);

	return api.patch(ownerUrl.houseEdit, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const getHouseReview = (accomNumber: number) => api.get(ownerUrl.houseReview + '?accomNumber=' + accomNumber);

const addReviewComment = (reviewNumber: number, reviewComment: string) =>
	api.patch(ownerUrl.addComment, null, {
		params: {
			reviewNumber,
			reviewComment,
		},
	});

const patchReviewComment = (reviewNumber: number, reviewComment: string) =>
	api.patch(ownerUrl.patchComment, null, {
		params: {
			reviewNumber,
			reviewComment,
		},
	});

const reportReview = (reviewNumber: number, reportMessage: string) =>
	api.patch(ownerUrl.reportReview, null, {
		params: {
			reviewNumber,
			reportMessage,
		},
	});

//예약
const checkMyHouseReservation = (yearMonth: string) => api.get(ownerUrl.checkReservation, { params: { yearMonth } });
const getHouseReservation = (accomNumber: number, yearMonth: string) => api.get(ownerUrl.getReservation, { params: { accomNumber, yearMonth } });
const getReservableRoomList = (accomNumber: number, yearMonth: string) =>
	api.get(ownerUrl.getRoomAvailability, { params: { accomNumber, yearMonth } });
const cancelReservation = (reservationNumber: number) => api.patch(ownerUrl.cancelReservation, null, { params: { reservationNumber } });
const getRoomReservableDays = (roomNumber: number, startDate: string) => api.get(ownerUrl.roomReservableDay, { params: { roomNumber, startDate } });
const addOfflineReservation = (data: {
	accomNumber: number;
	accomName: string;
	roomNumber: number;
	roomCategory: string;
	guestName: string;
	startDate: string;
	endDate: string;
}) => api.post(ownerUrl.offlineReservation, data);
//  삭제
const requestHouseDelete = (accomNumber: number) => api.patch(ownerUrl.houseDeleteRequest, null, { params: { accomNumber } });
const deleteRoom = (roomNumber: number) => api.patch(roomUrl.roomDelete, null, { params: { roomNumber } });

//정산

const getIncomeApi = () => api.get(ownerUrl.getIncome);
export {
	getMyHouseListData,
	onRegiFunnelData,
	onEditManageHouseApi,
	getHouseReview,
	addReviewComment,
	patchReviewComment,
	reportReview,
	requestHouseDelete,
	deleteRoom,
	getIncomeApi,
};
//예약
export { checkMyHouseReservation, getHouseReservation, getReservableRoomList, cancelReservation, getRoomReservableDays, addOfflineReservation };
