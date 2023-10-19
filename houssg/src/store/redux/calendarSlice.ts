import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CalendarState {
	status: 'idle' | 'loading' | 'failed' | 'success';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	calendarInfo: any;
}

const initialState: CalendarState = {
	status: 'idle',
	calendarInfo: '',
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarModalInfo: (state, action) => {
			state.calendarInfo = action.payload.calendarInfo;
		},
	},
});

export const { setCalendarModalInfo } = calendarSlice.actions;
export const calendarData = (state: RootState) => state.calendar.calendarInfo;

export default calendarSlice.reducer;
