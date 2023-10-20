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
	initailData: OwnerReservedRoom[];
	isReservationList: boolean;
}

interface ReservationDropDown {
	accomList: {
		accomNumber: number;
		accomName: string;
	}[];
	houseIndex: number;
	setHouseIndex: React.Dispatch<React.SetStateAction<number>>;
}

type CalendarEvent = { title: string; constraint?: string; start?: string; end?: string; date?: string; id: string };

export type { OwnerReservedRoom, OwnerAvailableRoom, CommonCalendarProps, CheckMyHouseReservationType, ReservationDropDown, CalendarEvent };
