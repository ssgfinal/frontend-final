interface RoomDataType {
	accomNumber: number;
	roomNumber: number;
	roomCategory: string;
	roomDetails: string;
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

export type { RoomDataType, RoomData, RoomComp };
