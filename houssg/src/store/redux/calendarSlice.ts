import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { CalendarEvent } from '../../types';

export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success';

	ownerHouseId: number;
	ownerHouseName: string;

	eventStart: string;
	eventEnd: string;
	calendarDate: string;
	reservationInfo: {
		start: string;
		end: string;
		eventId: string;
		eventRoomName: string;
		guestName: string;
		guestNumber: string;
	};
	dateCalendarEvents: { date: string; events: CalendarEvent[] };
}

const initialState: CalendarState = {
	status: 'idle',
	ownerHouseId: 0,
	ownerHouseName: '',

	eventStart: '1980-01-01', //임의의 날짜
	eventEnd: '1980-01-02',
	calendarDate: '1980-01',

	reservationInfo: {
		start: '1980-01-01',
		end: '1980-01-02',
		eventId: '',
		eventRoomName: '',
		guestName: '',
		guestNumber: '',
	},
	dateCalendarEvents: { date: '', events: [] },
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarEventAdd: (state, action) => {
			state = action.payload;
		},
		setCalendarReservatinInfo: (state, action) => {
			state.reservationInfo = action.payload.reservationInfo;
			state.calendarDate = action.payload.calendarDate;
		},
		setOwnerHouse: (state, action) => {
			state.ownerHouseId = action.payload.houseId;
			state.ownerHouseName = action.payload.houseName;
		},
		setDayCalendarEvents: (state, action) => {
			state.dateCalendarEvents = action.payload.dateCalendarEvents;
		},
	},
});

const ownerHouseId = (state: RootState) => state.calendar.ownerHouseId;
const ownerHouseName = (state: RootState) => state.calendar.ownerHouseName;

const calendarDate = (state: RootState) => state.calendar.calendarDate;
const reservationInfo = (state: RootState) => state.calendar.reservationInfo;
const dateCalendarEvents = (state: RootState) => state.calendar.dateCalendarEvents;
export const { setCalendarEventAdd, setCalendarReservatinInfo, setOwnerHouse, setDayCalendarEvents } = calendarSlice.actions;

export { ownerHouseId, ownerHouseName, calendarDate, reservationInfo, dateCalendarEvents };
export default calendarSlice.reducer;
