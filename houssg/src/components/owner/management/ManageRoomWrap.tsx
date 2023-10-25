import styled from 'styled-components';
import RoomCompToggler from './element/RoomCompToggler';
import { useNavigate } from 'react-router-dom';
import { ownerRoute, roomKey } from '../../../assets/constant';
import { useQuery } from '@tanstack/react-query';
import { getTargetRoomData } from '../../../helper';
import { RoomDataType } from '../../../types';
import { color } from '../../../assets/styles';
const ManageRoomWrap: React.FC<{ accomNumber: number }> = ({ accomNumber }) => {
	const navigate = useNavigate();
	const goRoomAddComp = () => {
		navigate(ownerRoute.roomRegi + accomNumber);
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: RoomDataType[] }>(
		[roomKey.targetRoom, accomNumber],
		() => getTargetRoomData(accomNumber),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 3 * 60 * 1000,
		},
	);
	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<BtnContainer>
			<RoomAddBtn
				onClick={() => {
					goRoomAddComp();
				}}
			>
				객실 추가하기
			</RoomAddBtn>
			{isSuccess && data.data.length ? (
				data.data.some((room) => room.delRequest === 0) ? (
					data.data.map((room) => !room.delRequest && <RoomCompToggler room={room} key={room.roomNumber} />)
				) : (
					<NoRoomMessage>객실을 추가해 주세요</NoRoomMessage>
				)
			) : (
				<NoRoomMessage>객실을 추가해 주세요</NoRoomMessage>
			)}
		</BtnContainer>
	);
};

export default ManageRoomWrap;

const BtnContainer = styled.div`
	margin-top: 2rem;
`;

const RoomAddBtn = styled.div`
	margin: 1rem auto;
	font-weight: bold;
	cursor: pointer;
	width: 9rem;
	border: 2px solid ${color.basicColor};
	padding: 0.5rem;
	border-radius: 4px;
	transition: border-color 0.2s, color 0.2s;
	&:hover {
		border-color: ${color.color1};
		color: ${color.color1};
	}
`;

const NoRoomMessage = styled.div`
	font-weight: 600;
	margin-top: 2rem;
	color: ${color.red};
	margin-bottom: 1.5rem;
`;
