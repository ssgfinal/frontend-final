import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { CalendarEvent } from '../../types';

export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success';

	ownerHouseId: number;
	ownerHouseName: string;

	reservableRoomInfo: {
		date: string;
		roomId: number;
		roomName: string;
		amount: string;
	};
	reservationInfo: {
		start: string;
		end: string;
		eventId: string;
		eventRoomName: string;
		guestName: string;
		guestNumber: string;
		calendarDate: string;
	};
	dateCalendarEvents: { date: string; events: CalendarEvent[] };
	dateAvailableRooms: { roomName: string; amount: string; date: string; roomId: number }[];
}

const initialState: CalendarState = {
	status: 'idle',
	ownerHouseId: 0,
	ownerHouseName: '',

	reservableRoomInfo: {
		roomId: 0,
		date: '1980-01-01',
		roomName: '로딩중',
		amount: '',
	},

	reservationInfo: {
		start: '1980-01-01',
		end: '1980-01-02',
		eventId: '',
		eventRoomName: '',
		guestName: '',
		guestNumber: '',
		calendarDate: '1980-01-01',
	},
	dateCalendarEvents: { date: '', events: [] },
	dateAvailableRooms: [{ roomName: '', amount: '', date: '', roomId: 0 }],
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarEvent: (state, action) => {
			state.reservableRoomInfo = action.payload;
		},
		setCalendarReservatinInfo: (state, action) => {
			state.reservationInfo = action.payload.reservationInfo;
		},
		setOwnerHouse: (state, action) => {
			state.ownerHouseId = action.payload.houseId;
			state.ownerHouseName = action.payload.houseName;
		},
		setDayCalendarEvents: (state, action) => {
			state.dateCalendarEvents = action.payload.dateCalendarEvents;
		},
		setCalendarAvailableRoom: (state, action) => {
			state.dateAvailableRooms = action.payload.dateAvailableRooms;
		},
	},
});

const ownerHouseId = (state: RootState) => state.calendar.ownerHouseId;
const ownerHouseName = (state: RootState) => state.calendar.ownerHouseName;

const reservableRoomInfo = (state: RootState) => state.calendar.reservableRoomInfo;
const reservationInfo = (state: RootState) => state.calendar.reservationInfo;
const dateCalendarEvents = (state: RootState) => state.calendar.dateCalendarEvents;
const dateAvailableRooms = (state: RootState) => state.calendar.dateAvailableRooms;
export const { setCalendarEvent, setCalendarReservatinInfo, setOwnerHouse, setDayCalendarEvents, setCalendarAvailableRoom } = calendarSlice.actions;

export { ownerHouseId, ownerHouseName, reservableRoomInfo, reservationInfo, dateCalendarEvents, dateAvailableRooms };
export default calendarSlice.reducer;
