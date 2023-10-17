import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import styled from 'styled-components';
import useCalendarStyle from '../../../hooks/useCalendarStyle';
import { useState } from 'react';
import { CommonCalendarProps, OwnerReservedRoom } from '../../../types';
import { color } from '../../../assets/styles';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../../assets/constant';
import { getHouseReservation, getReservableRoomList } from '../../../helper';
import { useRef } from 'react';
import { changeYearMonth } from '../../../utils';

const OwnerCalendar: React.FC<CommonCalendarProps> = ({ currentDate, initailData, houseId }) => {
	useCalendarStyle('owner');
	const calendarRef = useRef<FullCalendar | null>(null);
	// const calenderApi = calendarRef.current?.getApi().view.title; // 혹시 몰라 놔둠
	const [calendarDate, setCalendarDate] = useState(currentDate);

	console.log(calendarDate);
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: OwnerReservedRoom[] }>(
		[ownerKey.getReservationData, houseId, calendarDate.year + '-' + calendarDate.month],
		() => getHouseReservation(houseId, calendarDate.year + '-' + calendarDate.month),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 5 * 60 * 1000,
			keepPreviousData: true,
			placeholderData: { data: initailData },
		},
	);

	const reservationableRoomList = useQuery<{ data: OwnerReservedRoom[] }>(
		[ownerKey.reserveAvailability, houseId, calendarDate.year + '-' + calendarDate.month],
		() => getReservableRoomList(houseId, calendarDate.year + '-' + calendarDate.month),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 5 * 60 * 1000,
			keepPreviousData: true,
		},
	);

	isError && console.log(error, 'error');
	isSuccess && console.log(data, '예약목록');
	reservationableRoomList.isSuccess && console.log(reservationableRoomList.data, '예약가능목록');

	if (isLoading) {
		return <div>로딩중...</div>;
	}
	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		console.log(args.dateStr); // 날짜정보
		console.log(args.dayEl.innerText); // 이벤트가 있으면 innerText가 /n이 들어가 있음
	};

	return (
		<CalendarContainer>
			<FullCalendar
				headerToolbar={{
					left: 'prev next', // 좌측버튼
					center: 'title',
					end: 'today',
				}}
				customButtons={{
					prev: {
						text: 'prev',
						click: () => {
							calendarRef.current?.getApi().prev();
							setCalendarDate(changeYearMonth(calendarDate.year, calendarDate.month, 'prev'));
						},
					},
					next: {
						text: 'next',
						click: () => {
							calendarRef.current?.getApi().next();
							setCalendarDate(changeYearMonth(calendarDate.year, calendarDate.month, 'next'));
						},
					},
					today: {
						text: 'today',
						click: () => {
							calendarRef.current?.getApi().today();
							setCalendarDate(currentDate);
						},
					},
				}}
				locale={'ko'} // 한국어
				businessHours={true} // 주말을 다른 색으로
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={handleDateClick}
				ref={calendarRef}
				aspectRatio={2}
				dayMaxEvents={3}
				eventBackgroundColor={color.color3}
				eventBorderColor="transparent"
				// contentHeight={800}
			/>
		</CalendarContainer>
	);
};

export default OwnerCalendar;

const CalendarContainer = styled.div`
	padding: 0 0.5rem;
	.fc-daygrid-day-frame {
		cursor: pointer;
		height: 5.5rem;
	}

	.calendar-unable {
		background-color: lavenderblush;
		cursor: not-allowed;
	}
`;
