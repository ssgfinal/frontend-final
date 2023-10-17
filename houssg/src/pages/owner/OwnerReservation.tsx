import styled from 'styled-components';
import { useState } from 'react';
import { OwnerCalendar, ReservationDropDown } from '../../components/owner/reservation';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../assets/constant';
import { checkMyHouseReservation } from '../../helper';
import { CheckMyHouseReservationType } from '../../types';

const OwnerReservation = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const [houseIndex, setHouseIndex] = useState(0);
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: CheckMyHouseReservationType }>(
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
			{isSuccess && (
				<>
					<ReservationDropDown accomList={data.data.accommodationList} houseIndex={houseIndex} setHouseIndex={setHouseIndex} />
					<OwnerCalendar
						currentDate={{ year: currentYear, month: currentMonth }}
						initailData={data.data.reservations}
						houseId={data.data.accommodationList[houseIndex].accomNumber}
					/>
				</>
			)}
		</OwnerReservationWrapper>
	);
};

export default OwnerReservation;

const OwnerReservationWrapper = styled.div`
	margin: 1rem 0;
`;
