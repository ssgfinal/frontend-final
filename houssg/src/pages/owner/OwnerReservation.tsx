import styled from 'styled-components';
import { ReservationDropDown } from '../../components/owner/reservation';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../assets/constant';
import { checkMyHouseReservation } from '../../helper';
import OwnerCalendar from '../../components/owner/reservation/OwnerCalendar';

const OwnerReservation = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;

	const { isLoading, data, isSuccess, isError, error } = useQuery(
		[ownerKey.checkReservationList],
		() => checkMyHouseReservation(currentYear + '-' + currentMonth),
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		},
	);

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	isSuccess && console.log(data);

	return (
		<OwnerReservationWrapper>
			<ReservationDropDown />
			<OwnerCalendar />
		</OwnerReservationWrapper>
	);
};

export default OwnerReservation;

const OwnerReservationWrapper = styled.div`
	margin: 1rem 0;
`;
