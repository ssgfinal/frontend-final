import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { flexCenter } from '../../../../assets/styles';
import { closeModal, modalText } from '../../../../store/redux/modalSlice';
import { ownerKey, roomKey } from '../../../../assets/constant';
import { deleteRoom, requestHouseDelete } from '../../../../helper';

const DeleteRequestScreen = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const houseOrRoom = useAppSelector(modalText);
	const categoryAndId = houseOrRoom.split(' && ');
	const category = categoryAndId[0];
	const houseId = parseInt(categoryAndId[1]);
	const roomId = parseInt(categoryAndId[2]); // room인 경우에만 존재
	const deleSuccessMessage = category === 'house' ? '삭제 요청 하였습니다.' : '삭제 되었습니다.';
	const queryKey = category === 'house' ? [ownerKey.myHouseList] : [roomKey.targetRoom, houseId];

	const { mutate } = useMutation({
		mutationFn: () => (category === 'house' ? requestHouseDelete(houseId) : deleteRoom(roomId)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			alert(deleSuccessMessage);
			dispatch(closeModal());
		},
		onError: () => {
			alert('실패 하였습니다.');
		},
	});

	const onDeleteHandler = () => {
		if (category === 'room' && isNaN(roomId)) {
			alert('비정상적인 접근입니다.');
			return;
		}
		mutate();
	};

	return (
		<DeleteModalWrapper>
			<div>{category === 'house' ? '숙소 삭제 요청' : '객실 삭제 요청'}</div>
			<div>{category === 'house' ? '숙소' : '객실'}을 진짜 삭제하겠습니까?</div>
			<button onClick={onDeleteHandler}>삭제</button>
		</DeleteModalWrapper>
	);
};

export default DeleteRequestScreen;

const DeleteModalWrapper = styled.div`
	margin: 1rem;
	background-color: red;
	width: 100%;
	${flexCenter}
	flex-direction: column;
`;
