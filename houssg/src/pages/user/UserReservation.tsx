// import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { RoomInfo } from '../../components/reservation/RoomInfo';
import { BookerInfo } from '../../components/reservation/BookerInfo';
import { VisitorInfo } from '../../components/reservation/VisitorInfo';
import { Breakdown } from '../../components/reservation/Breakdown';
import { PaymentWidget } from '../../components/reservation/PaymentWidget';
import { useState } from 'react';

export const UserReservation = () => {
	// const { roomId } = useParams();
	// 결제 금액
	const [payment, setPayment] = useState(0);

	return (
		<Wrapper>
			<RoomInfo />
			<BookerInfo />
			<VisitorInfo />
			<Breakdown payment={payment} setPayment={setPayment} />
			<PaymentWidget payment={payment} />
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
