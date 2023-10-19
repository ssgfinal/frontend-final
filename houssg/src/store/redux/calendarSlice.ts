import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	calendarOwnerInfo: any;
	ownerHouseId: number;
	ownerHouseName: string;
}

const initialState: CalendarState = {
	status: 'idle',
	calendarOwnerInfo: '',
	ownerHouseId: 0,
	ownerHouseName: '',
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarOwnerInfoInfo: (state, action) => {
			state.calendarOwnerInfo = action.payload.calendarInfo;
		},
		setOwnerHouse: (state, action) => {
			state.ownerHouseId = action.payload.houseId;
			state.ownerHouseName = action.payload.houseName;
		},
	},
});

const calendarOwnerData = (state: RootState) => state.calendar.calendarOwnerInfo;
const ownerHouseId = (state: RootState) => state.calendar.ownerHouseId;
const ownerHouseName = (state: RootState) => state.calendar.ownerHouseName;
export const { setCalendarOwnerInfoInfo, setOwnerHouse } = calendarSlice.actions;

export { calendarOwnerData, ownerHouseId, ownerHouseName };
export default calendarSlice.reducer;
