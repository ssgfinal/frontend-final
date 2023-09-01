import { Modal } from 'antd';

import { closeModal, isModalOpen, modalComponent, modalSize } from '../../store/redux/modalSlice';
import { AuthWrap } from '../auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AuthCancelReservation from '../CancelReservation';

const CommonModal = () => {
	const modalState = useAppSelector(isModalOpen);
	const modalComp = useAppSelector(modalComponent);
	const size = useAppSelector(modalSize);

	const dispatch = useAppDispatch();
	const onCloseModal = () => {
		dispatch(closeModal());
	};
	//TODO: 차선으로 상태 관리중
	if (!modalComp) {
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
			></Modal>
		);
	}

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
			{modalComp === 'cancel' && <AuthCancelReservation />}
		</Modal>
	);
};

export default CommonModal;
