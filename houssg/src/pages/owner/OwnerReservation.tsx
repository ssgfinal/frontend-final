import styled from 'styled-components';
import { CommonCalendar } from '../../components/common';
import { ReservationDropDown } from '../../components/owner/reservation';

const OwnerReservation = () => {
	return (
		<OwnerReservationWrapper>
			<ReservationDropDown />
			<CommonCalendar type="owner" />
		</OwnerReservationWrapper>
	);
};

export default OwnerReservation;

const OwnerReservationWrapper = styled.div`
	margin: 1rem 0;
`;
