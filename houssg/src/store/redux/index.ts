// 전역변수 상태관리 리덕스 저장소를 관리하는 폴더입니다.
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

export const store = configureStore({
	reducer: {
		modal: modalReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
