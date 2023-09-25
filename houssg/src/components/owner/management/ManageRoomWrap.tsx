import styled from 'styled-components';
import { RoomList } from '../../../assets/constant/reservationDummy';
import RoomCompToggler from './element/RoomCompToggler';
import { useNavigate } from 'react-router-dom';
import { ownerRoute } from '../../../assets/constant';
const ManageRoomWrap = () => {
	const navigate = useNavigate();
	//TODO: 부모 컴퍼넌트의 ID값 받기
	const goRoomAddComp = () => {
		navigate(ownerRoute.roomRegi + '1');
	};

	return (
		<div>
			<RoomAddBtn
				onClick={() => {
					goRoomAddComp();
				}}
			>
				객실 추가하기
			</RoomAddBtn>
			{RoomList.map((room) => (
				<RoomCompToggler room={room} key={room.room_number} />
			))}
		</div>
	);
};

export default ManageRoomWrap;

const RoomAddBtn = styled.div`
	margin: 1rem 0;
	font-weight: bold;
	cursor: pointer;
`;
