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

interface OwnerHouseReviewType {
	accomName: string;
	accomNumber: number;
	img: string;
	managerId: string;
	nickname: string;
	reportStatus: number;
	reservationNumber: number;
	reviewComment: string;
	reviewCommentTime: string;
	reviewContent: string;
	reviewCreationTime: string;
	reviewNumber: number;
	reviewRating: number;
	roomCategory: string;
	roomNumber: number;
}

export type { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType, OwnerHouseReviewType };
