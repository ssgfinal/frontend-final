interface ManageNavProps {
	isRoomSelected: number;
	setSelectedNav: React.Dispatch<React.SetStateAction<number>>;
	isOpenTabComp: boolean;
	setIsOpenTabComp: React.Dispatch<React.SetStateAction<boolean>>;
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
	accomNumber: number;
	newCheckInValue: string;
	newCheckOutValue: string;
	newDetailValue: string;
	newPhoneNumberValue: string;
	checkedList: number[];
	newImgFile: File | null;
}

export type { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType };
