import styled from 'styled-components';
import RoomCompToggler from './element/RoomCompToggler';
import { useNavigate } from 'react-router-dom';
import { ownerRoute, roomKey } from '../../../assets/constant';
import { useQuery } from '@tanstack/react-query';
import { getTargetRoomData } from '../../../helper';
import { RoomDataType } from '../../../types';
const ManageRoomWrap: React.FC<{ accomNumber: number }> = ({ accomNumber }) => {
	const navigate = useNavigate();
	const goRoomAddComp = () => {
		navigate(ownerRoute.roomRegi + accomNumber);
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: RoomDataType[] }>(
		[roomKey.targetRoom, accomNumber],
		() => getTargetRoomData(accomNumber),
		{
			cacheTime: 5 * 60 * 1000, // 5분
			staleTime: 2 * 60 * 1000, // 2분
		},
	);

	isSuccess && console.log(data, '성공시');
	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<div>
			<RoomAddBtn
				onClick={() => {
					goRoomAddComp();
				}}
			>
				객실 추가하기
			</RoomAddBtn>
			{isSuccess && data.data.map((room) => <RoomCompToggler room={room} key={room.roomNumber} />)}
		</div>
	);
};

export default ManageRoomWrap;

const RoomAddBtn = styled.div`
	margin: 1rem 0;
	font-weight: bold;
	cursor: pointer;
`;
