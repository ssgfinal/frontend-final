import { Modal } from 'antd';

import { closeModal, isModalOpen, modalComponent, modalSize } from '../../store/redux/modalSlice';
import { AuthWrap } from '../auth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CommonInstruction } from '.';
import EditNickName from '../usermypages/EditNickName';
import EditPhoneNumber from '../usermypages/EditPhoneNumber';
import EditPassword from '../usermypages/EditPassword';
import WithdrawalInstruction from '../usermypages/WithdrawalInstruction';
import Terms from '../reservation/Terms';
import CancelReservation from '../reservation/CancelReservation';
import ReviewWrite from '../reservation/ReviewWrite';
import { DeclarationReview, DeleteRequestScreen, HouseComment } from '../owner/management/element';
import { OwnerReservationModal } from '../owner/reservation';

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
			{modalComp === 'editNickName' && <EditNickName />}
			{modalComp === 'editPhoneNumber' && <EditPhoneNumber />}
			{modalComp === 'editPassword' && <EditPassword />}
			{modalComp === 'withdrawal' && <WithdrawalInstruction />}
			{modalComp === 'provision' && <Terms />}
			{modalComp === 'cancelReservation' && <CancelReservation />}
			{modalComp === 'declaration' && <DeclarationReview />}
			{modalComp === 'houseComment' && <HouseComment />}
			{modalComp === 'userReview' && <ReviewWrite />}
			{modalComp === 'deleRequest' && <DeleteRequestScreen />}
			{modalComp === 'ownerReservation' && <OwnerReservationModal />}
			{(modalComp === 'instruction' || modalComp === 'couponRegistration') && <CommonInstruction />}
		</Modal>
	);
};

export default CommonModal;
