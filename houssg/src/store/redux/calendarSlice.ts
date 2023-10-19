import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

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
	};
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
	},
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarEventAdd: (state, action) => {
			state = action.payload;
			// TODO:
		},
		setCalendarReservatinInfo: (state, action) => {
			state.reservationInfo = action.payload.reservationInfo;
			state.calendarDate = action.payload.calendarDate;
		},
		setOwnerHouse: (state, action) => {
			state.ownerHouseId = action.payload.houseId;
			state.ownerHouseName = action.payload.houseName;
		},
	},
});

const ownerHouseId = (state: RootState) => state.calendar.ownerHouseId;
const ownerHouseName = (state: RootState) => state.calendar.ownerHouseName;

const calendarDate = (state: RootState) => state.calendar.calendarDate;
const reservationInfo = (state: RootState) => state.calendar.reservationInfo;
export const { setCalendarEventAdd, setCalendarReservatinInfo, setOwnerHouse } = calendarSlice.actions;

export { ownerHouseId, ownerHouseName, calendarDate, reservationInfo };
export default calendarSlice.reducer;
