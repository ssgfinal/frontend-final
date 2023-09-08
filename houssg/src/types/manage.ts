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

export type { ManageNavProps, RoomData, RoomComp };
