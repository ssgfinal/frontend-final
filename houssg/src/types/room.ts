interface RoomDataType {
	accomNumber: number;
	roomNumber: number;
	imgs: string[];
	roomCategory: string;
	roomDetails?: string;
	roomPrice: number;
	roomAvailability: number;
	service: number[];
	delRequest: number;
}

interface RoomData {
	room: RoomDataType;
}

interface RoomComp extends RoomData {
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddRoomProps {
	roomCountValue?: string;
	roomCategoryValue?: string;
	roomPriceValue?: string;
	roomImgFiles: File[];
	houseId?: string;
	checkedList: number[];
	roomNumber?: string;
	resistImage?: string[];
}

export type { RoomDataType, RoomData, RoomComp, AddRoomProps };
