// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomDetail } from './RoomDetail';
// import { accomodation } from '../../assets/icons';
// import { ocean, nosmoking } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { Room } from '../../types';
import { userUrl } from '../../assets/constant';
import api from '../../api/api';
import { useLocation } from 'react-router-dom';

export const RoomList = () => {
	const location = useLocation();
	const house = location.state.house;

	const [roomList, setRoomList] = useState<Room[]>();

	useEffect(() => {
		try {
			api.get(userUrl.roomList, { params: { accomNumber: house.accomNumber } }).then(({ data }) => {
				setRoomList(data);
			});
		} catch (error) {
			console.error('데이터를 불러오는데 실패했습니다.', error);
		}
	}, []);

	return <Wrapper>{roomList && roomList.map((room) => <RoomDetail key={room.roomNumber} room={room} />)}</Wrapper>;
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
		/* grid-gap: 1rem; */
	}
`;
