import { useAppSelector } from '../../../hooks';
import { modalText } from '../../../store/redux/modalSlice';

const OwnerReservationModal = () => {
	const text = useAppSelector(modalText);

	return (
		<div>
			OwnerReservationModal
			<div>{text}</div>
		</div>
	);
};

export default OwnerReservationModal;
