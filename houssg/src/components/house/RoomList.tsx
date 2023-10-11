// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomDetail } from './RoomDetail';
import { RoomDataType } from '../../types';
import { roomKey } from '../../assets/constant';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTargetRoomData } from '../../helper';

export const RoomList = () => {
	const location = useLocation();
	const house = location.state.house;

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: RoomDataType[] }>(
		[roomKey.targetRoom, house.accomNumber],
		() => getTargetRoomData(house.accomNumber),
		{
			cacheTime: 5 * 60 * 1000, // 5분
			staleTime: 2 * 60 * 1000, // 2분
		},
	);

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	// const [roomList, setRoomList] = useState<Room[]>();

	return <Wrapper>{isSuccess && data.data.map((room) => <RoomDetail key={room.roomNumber} room={room} />)}</Wrapper>;
};

const Wrapper = styled.div`
	padding: 1rem 0;
	display: grid;

	@media (min-width: 930px) {
		grid-template-columns: 1fr 1fr;
		grid-gap: 5rem;
	}

	@media (min-width: 650px) and (max-width: 930px) {
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
	}

	@media (max-width: 650px) {
		grid-template-columns: 1fr;
	}
`;
