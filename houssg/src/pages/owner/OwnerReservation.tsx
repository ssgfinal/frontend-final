import styled from 'styled-components';
import { useState } from 'react';
import { OwnerCalendar, ReservationDropDown } from '../../components/owner/reservation';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../assets/constant';
import { checkMyHouseReservation } from '../../helper';
import { CheckMyHouseReservationType } from '../../types';
import { useAppSelector } from '../../hooks';
import { ownerHouseId } from '../../store/redux/calendarSlice';

const OwnerReservation = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth() + 1;
	const [houseIndex, setHouseIndex] = useState(0);
	const [isReservationList, setIsReservationList] = useState(true);
	const houseId = useAppSelector(ownerHouseId);

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

	return (
		<OwnerReservationWrapper>
			{isSuccess && (
				<>
					<CalendarOptionContainer>
						<ReservationDropDown accomList={data.data.accommodationList} houseIndex={houseIndex} setHouseIndex={setHouseIndex} />
						<CalendarModeBtn onClick={() => setIsReservationList(!isReservationList)}>
							{isReservationList ? '예약가능일 보기' : '예약내역 보기'}
						</CalendarModeBtn>
					</CalendarOptionContainer>
					{!!houseId && (
						<OwnerCalendar
							currentDate={{ year: currentYear, month: currentMonth }}
							initailData={data.data.reservations}
							isReservationList={isReservationList}
						/>
					)}
				</>
			)}
		</OwnerReservationWrapper>
	);
};

export default OwnerReservation;

const OwnerReservationWrapper = styled.div`
	margin: 1rem 0;
`;

const CalendarOptionContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	padding-inline: 16px;

	@media screen and (max-width: 600px) {
		gap: 0.7rem;
		justify-content: space-between;
		padding-inline: 4px;
	}
`;
const CalendarModeBtn = styled.div`
	font-size: 1.1rem;
	font-weight: 600;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
	padding: 0.5rem;
	border-radius: 0.5rem;
	height: 3rem;
	width: 11rem;
	@media screen and (max-width: 600px) {
		width: 6rem;
		font-size: 0.65rem;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
