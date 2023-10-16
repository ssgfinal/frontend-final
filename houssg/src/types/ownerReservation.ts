interface OwnerReservedRoom {
	roomNumber: number;
	roomCategory: string;
	startDate: string;
	endDate: string;
	guestName: string;
	guestPhone: string;
}

interface OwnerAvailableRoom {
	roomNumber: number;
	roomCategory: string;
	availabilityInfo: [
		{
			date: string;
			availableRooms: number;
		},
	];
}

interface CheckMyHouseReservationType {
	accommodationList: { accomNumber: number; accomName: string }[];
	reservations: [];
}

interface CommonCalendarProps {
	houseId: number;
}

export type { OwnerReservedRoom, OwnerAvailableRoom, CommonCalendarProps, CheckMyHouseReservationType };
