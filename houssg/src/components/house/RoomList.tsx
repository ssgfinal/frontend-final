// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomDetail } from './RoomDetail';
import { accomodation } from '../../assets/icons';
import { seaview, nosmoke } from '../../assets/icons';

export const RoomList = () => {
	// const { houseId } = useParams();
	const rooms = [
		{
			id: 1,
			img: accomodation,
			icon: [seaview, nosmoke],
			type: '스탠다드',
			service: '트윈 베드, 오션뷰',
			price: 20000,
		},
		{
			id: 2,
			img: accomodation,
			icon: [seaview, nosmoke],
			type: '트윈룸',
			service: 'pc',
			price: 20000,
		},
		{
			id: 3,
			img: accomodation,
			icon: [seaview, nosmoke],
			type: '패밀리룸',
			service: '스파, 금연객실',
			price: 20000,
		},
	];

	return (
		<Wrapper>
			{rooms.map((room) => (
				<RoomDetail key={room.id} room={room} />
			))}
		</Wrapper>
	);
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
