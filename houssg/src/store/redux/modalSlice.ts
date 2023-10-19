import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface ModalState {
	isModalOpen: boolean;
	modalComponent: string;
	modalSize: string | number;
	modalText: string;
	modalProps?: {
		[key: string]: string | number | boolean;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	modalFunc?: any;
}

const initialState: ModalState = {
	isModalOpen: false,
	modalComponent: '',
	modalSize: '500px',
	modalProps: {},
	modalFunc: '함수가 실행되었습니다.',
	modalText: '',
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
			} else {
				state.modalSize = '500px';
			}
			if (action.payload.modalProps) {
				state.modalProps = action.payload.modalProps;
			}
			if (action.payload.modalText) {
				state.modalText = action.payload.modalText;
			}
		},
		closeModal: (state) => {
			state.modalComponent = '';
			state.isModalOpen = false;
			state.modalProps = {};
			state.modalFunc = '';
			state.modalText = '';
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modal.isModalOpen;
export const modalComponent = (state: RootState) => state.modal.modalComponent;
export const modalSize = (state: RootState) => state.modal.modalSize;
export const modalProps = (state: RootState) => state.modal.modalProps;
export const modalFunc = (state: RootState) => state.modal.modalFunc;
export const modalText = (state: RootState) => state.modal.modalText;

export default modalSlice.reducer;
