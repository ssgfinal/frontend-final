interface RoomDataType {
	accomNumber: number;
	roomNumber: number;
	roomImg?: string; // 추후 추가될 컬럼
	roomCategory: string;
	roomDetails?: string; // 추후 백에서 삭제할 컬럼
	roomPrice: number;
	roomAvailability: number;
	service: number[];
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
	houseImgFiles: File[];
	houseId?: string;
	checkedList: number[];
}

export type { RoomDataType, RoomData, RoomComp, AddRoomProps };
