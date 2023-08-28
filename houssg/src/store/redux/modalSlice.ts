import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { RootState } from '.';

export interface ModalState {
	isModalOpen: boolean;
	modalComponent: ReactNode | null;
}

const initialState: ModalState = {
	isModalOpen: false,
	modalComponent: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isModalOpen = true;
			state.modalComponent = action.payload;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.modalComponent = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isModalOpen;
export const modalComponent = (state: RootState) => state.modal.modalComponent;

export default modalSlice.reducer;
