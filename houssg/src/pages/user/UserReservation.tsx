// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { UserReservationLeft } from '../../assets/styles';

import { RoomInfo } from '../../components/reservation/RoomInfo';
import { BookerInfo } from '../../components/reservation/BookerInfo';
import { VisitorInfo } from '../../components/reservation/VisitorInfo';
import { Breakdown } from '../../components/reservation/Breakdown';
import { Provision } from '../../components/reservation/Provision';

export const UserReservation = () => {
	// const { roomId } = useParams();
	return (
		<Wrapper>
			<RoomInfo />
			<BookerInfo />
			<VisitorInfo />
			<Breakdown />
			<Provision />
			<UserReservationLeft>결제</UserReservationLeft>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	@media (min-width: 850px) {
		padding: 2rem 15rem;
	}
	@media (min-width: 550px) and (max-width: 850px) {
		padding: 2rem 7rem;
	}
	@media (max-width: 550px) {
		padding: 2rem;
	}

	display: grid;
	grid-gap: 1rem;
`;
