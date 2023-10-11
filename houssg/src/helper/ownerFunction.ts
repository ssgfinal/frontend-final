import api from '../api/api';
import { ownerUrl } from '../assets/constant';
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
	newCheckInValue: string,
	newCheckOutValue: string,
	newDetailValue: string,
	newPhoneNumberValue: string,
	newImgFile: File | null,
) => {
	const formData = new FormData();
	if (newImgFile !== null) {
		formData.append('file', newImgFile);
	}
	const requestData = {
		teleNumber: newPhoneNumberValue,
		accomDetails: newDetailValue,
		checkIn: newCheckInValue,
		checkOut: newCheckOutValue,
	};

	const json = JSON.stringify(requestData);
	const blob = new Blob([json], { type: 'application/json' });
	formData.append('request', blob);

	return api.patch(ownerUrl.houseEdit, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export { getMyHouseListData, onRegiFunnelData, onEditManageHouseApi };
