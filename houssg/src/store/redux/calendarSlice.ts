import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	roomId: 0,
	status: 'idle',
	data: '',
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {},
});

export default calendarSlice.reducer;
