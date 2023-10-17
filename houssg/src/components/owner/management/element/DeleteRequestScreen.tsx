import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { SmallIndicatorText, color, flexCenter } from '../../../../assets/styles';
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
			{!houseOrRoom ? (
				<></>
			) : (
				<>
					<DeleText onClick={onDeleteHandler}>{category === 'house' ? '숙소를' : '객실을'} 진짜 삭제하겠습니까?</DeleText>
					<IndicatorContainer>
						<SmallIndicatorText>
							{category === 'house' ? '요청시 관리자가 검토 후 삭제됩니다.' : '삭제 후에도 기존 예약 내용은 유지됩니다.'}
						</SmallIndicatorText>
					</IndicatorContainer>
				</>
			)}
		</DeleteModalWrapper>
	);
};

export default DeleteRequestScreen;

const DeleteModalWrapper = styled.div`
	margin-top: 0.5rem;
	width: 100%;
	${flexCenter}
	height: 7rem;
	flex-direction: column;
`;

const DeleText = styled.div`
	font-size: 1rem;
	font-weight: 600;
	transition: color 0.3s;
	color: ${color.basicColor};
	cursor: pointer;
	&:hover {
		color: ${color.red};
	}
`;

const IndicatorContainer = styled.div`
	width: 15rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
