interface OwnerReservedRoom {
	roomNumber: number;
	roomCategory: string;
	startDate: string;
	endDate: string;
	guestName: string;
	guestPhone: string;
	reservationNumber: number;
	availabilityInfo: [
		{
			date: string;
			availableRooms: number;
		},
	];
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
	reservations: OwnerReservedRoom[];
}

interface CommonCalendarProps {
	currentDate: { year: number; month: number };
	houseId: number;
	initailData: OwnerReservedRoom[];
	isReservationList: boolean;
}

export type { OwnerReservedRoom, OwnerAvailableRoom, CommonCalendarProps, CheckMyHouseReservationType };
