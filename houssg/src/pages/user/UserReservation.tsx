// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomInfo } from '../../components/reservation/RoomInfo';
import { BookerInfo } from '../../components/reservation/BookerInfo';
import { VisitorInfo } from '../../components/reservation/VisitorInfo';
import { Breakdown } from '../../components/reservation/Breakdown';
import { PaymentWidget } from '../../components/reservation/PaymentWidget';

export const UserReservation = () => {
	// const { roomId } = useParams();
	return (
		<Wrapper>
			<RoomInfo />
			<BookerInfo />
			<VisitorInfo />
			<Breakdown />
			<PaymentWidget/>
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
