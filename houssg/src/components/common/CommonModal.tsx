import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxToolkit';
import { closeModal, isModalOpen, modalComponent } from '../../store/redux/modalSlice';
const CommonModal = () => {
	const modalState = useAppSelector(isModalOpen);
	const modalComp = useAppSelector(modalComponent);

	const dispatch = useAppDispatch();
	const onCloseModal = () => dispatch(closeModal());
	return (
		<div>
			<Modal open={modalState} footer={null} onCancel={onCloseModal} keyboard centered maskClosable>
				{modalComp}
			</Modal>
		</div>
	);
};

export default CommonModal;
