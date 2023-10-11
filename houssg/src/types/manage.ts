interface ManageNavProps {
	isRoomSelected: number;
	setSelectedNav: React.Dispatch<React.SetStateAction<number>>;
	isOpenTabComp: boolean;
	setIsOpenTabComp: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RoomData {
	room: {
		accom_number: number;
		room_image: string;
		room_number: number;
		room_category: string;
		room_detail: string;
		room_price: number;
		room_count: number;
	};
}

interface RoomComp extends RoomData {
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MyHouseData {
	accomNumber: number;
	accomName: string;
	accomAddress: string;
	teleNumber: string;
	accomCategory: string;
	accomDetails: string;
	checkIn: string;
	checkOut: string;
	businessNumber: string;
	id: string;
	auth: number;
	approvalRequest: number;
	deletionRequest: number;
	img: string;
	addRequest: number;
	service: number[];
}

interface MyHouseDataHandleComp {
	house: MyHouseData;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditMutationType {
	newCheckInValue: string;
	newCheckOutValue: string;
	newDetailValue: string;
	newPhoneNumberValue: string;
	newImgFile: File | null;
}

export type { ManageNavProps, RoomData, RoomComp, MyHouseData, MyHouseDataHandleComp, EditMutationType };
