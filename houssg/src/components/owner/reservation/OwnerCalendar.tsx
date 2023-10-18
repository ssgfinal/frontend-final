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

const OwnerCalendar: React.FC<CommonCalendarProps> = ({ currentDate, initailData, houseId, isReservationList }) => {
	const calendarRef = useRef<FullCalendar | null>(null);
	// const calenderApi = calendarRef.current?.getApi().view.title; // 혹시 몰라 놔둠
	const [calendarDate, setCalendarDate] = useState(currentDate);
	const [calendarEvents, setCalendarEvents] = useState<{ title: string; constraint?: string; start?: string; end?: string; date?: string }[]>([]);
	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		console.log(args.dateStr); // 날짜정보
		console.log(args.dayEl.innerText); // 이벤트가 있으면 innerText가 /n이 들어가 있음
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: OwnerReservedRoom[] }>(
		[isReservationList ? ownerKey.getReservationData : ownerKey.reserveAvailability, houseId, calendarDate.year + '-' + calendarDate.month],
		() =>
			isReservationList
				? getHouseReservation(houseId, calendarDate.year + '-' + calendarDate.month)
				: getReservableRoomList(houseId, calendarDate.year + '-' + calendarDate.month),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 5 * 60 * 1000,
			keepPreviousData: true,
			placeholderData: { data: initailData },
		},
	);

	const calendarEvent = data?.data.map((event) => {
		if (isReservationList) {
			return { title: event.roomCategory, start: event.startDate, end: event.endDate, constraint: event.guestName + '님' };
		}
	});

	// const calendarEvent = data?.data.map((event) => {
	// 	if (isReservationList) {
	// 		return { title: event.roomCategory, start: event.startDate, end: event.endDate, constraint: event.guestName + '님' };
	// 	} else {
	// 		const returnEvent = event.availabilityInfo.map((availabiity) => {
	// 			return { title: event.roomCategory + `${availabiity.availableRooms}`, date: availabiity.date };
	// 		});
	// 		return { ...returnEvent };
	// 	}
	// });

	// console.log(calendarEvent, '되나?');
	useCalendarStyle('owner', data?.data);

	isSuccess && console.log(data.data, isReservationList ? '예약목록' : '예약가능일');

	if (isError) {
		console.log(error);
		alert('에러 발생');
	}

	if (isLoading) {
		return <div>로딩중...</div>;
	}

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
				events={calendarEvent}
				eventBackgroundColor={color.color3}
				eventBorderColor="transparent"
				contentHeight={800}
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
