import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface ModalState {
	isModalOpen: boolean;
	modalComponent: string;
	modalSize: string | number;
	modalProps?: {
		[key: string]: string | number | boolean;
	};
}

const initialState: ModalState = {
	isModalOpen: false,
	modalComponent: '',
	modalSize: '500px',
	modalProps: {},
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isModalOpen = true;
			state.modalComponent = action.payload.modalComponent;
			if (action.payload.modalSize) {
				state.modalSize = action.payload.modalSize;
			}
			if (action.payload.modalProps) {
				state.modalProps = action.payload.modalProps;
			}
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.modalComponent = '';
			state.modalSize = 500;
			state.modalProps = {};
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isModalOpen;
export const modalComponent = (state: RootState) => state.modal.modalComponent;
export const modalSize = (state: RootState) => state.modal.modalSize;
export const modalProps = (state: RootState) => state.modal.modalProps;

export default modalSlice.reducer;
