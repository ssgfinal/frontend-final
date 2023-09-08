import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomDetail } from './RoomDetail';
import { accomodation } from '../../assets/icons';

export const RoomList = () => {
	const { houseId } = useParams();
	const rooms = [
		{
			id: 1,
			img: accomodation,
			type: '스탠다드',
			service: '트윈 베드, 오션뷰',
			price: 20000,
		},
		{
			id: 2,
			img: accomodation,
			type: '트윈룸',
			service: 'pc',
			price: 20000,
		},
		{
			id: 3,
			img: accomodation,
			type: '패밀리룸',
			service: '스파, 금연객실',
			price: 20000,
		},
	];

	return (
		<Wrapper>
			{rooms.map((room) => (
				<RoomDetail room={room} key={room.id} />
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1rem 0;
	display: grid;
	grid-template-columns: 1fr 1fr;

	@media (min-width: 800px) {
		grid-gap: 5rem;
	}

	@media (max-width: 800px) {
		grid-gap: 1rem;
	}
`;
