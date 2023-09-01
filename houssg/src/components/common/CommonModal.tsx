import { Modal } from 'antd';

import { closeModal, isModalOpen, modalComponent, modalSize } from '../../store/redux/modalSlice';
import { AuthWrap } from '../auth';
import { useAppDispatch, useAppSelector } from '../../hooks';

const CommonModal = () => {
	const modalState = useAppSelector(isModalOpen);
	const modalComp = useAppSelector(modalComponent);
	const size = useAppSelector(modalSize);

	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};

	return (
		<Modal
			bodyStyle={{ display: 'flex', justifyContent: 'center' }}
			open={modalState}
			footer={null}
			onCancel={onCloseModal}
			keyboard
			centered
			maskClosable
			width={size}
		>
			{modalComp === 'auth' && <AuthWrap />}
		</Modal>
	);
};

export default CommonModal;
