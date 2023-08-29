import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { RootState } from '.';

export interface ModalState {
	isModalOpen: boolean;
	modalComponent: ReactNode | null;
	modalSize: string | number;
}

const initialState: ModalState = {
	isModalOpen: false,
	modalComponent: null,
	modalSize: '500px',
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isModalOpen = true;
			state.modalComponent = action.payload.component;
			state.modalSize = action.payload.size;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.modalComponent = null;
			state.modalSize = 500;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isModalOpen;
export const modalComponent = (state: RootState) => state.modal.modalComponent;
export const modalSize = (state: RootState) => state.modal.modalSize;

export default modalSlice.reducer;
