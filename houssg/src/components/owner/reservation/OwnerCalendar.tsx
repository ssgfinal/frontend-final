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
import { useAppDispatch } from '../../../hooks';
import { openModal } from '../../../store/redux/modalSlice';

const OwnerCalendar: React.FC<CommonCalendarProps> = ({ currentDate, initailData, houseId, isReservationList }) => {
	const dispatch = useAppDispatch();
	const calendarRef = useRef<FullCalendar | null>(null);
	// const calenderApi = calendarRef.current?.getApi().view.title; // 혹시 몰라 놔둠
	const [calendarDate, setCalendarDate] = useState(currentDate);
	const calendarEvent: { title: string; constraint?: string; start?: string; end?: string; date?: string }[] = [];

	const today = new Date();
	today.setHours(9, 0, 0, 0);
	const calendarFullDate = new Date(calendarDate.year + '-' + calendarDate.month);

	const modalOpen = (component: string, type: 'event' | 'date') => {
		dispatch(openModal({ modalComponent: component, modalSize: 400, modalText: type }));
	};
	console.log(modalOpen);
	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		console.log(args.dateStr); // 날짜정보
		console.log(args.dayEl.innerText); // 이벤트가 있으면 innerText가 /n이 들어가 있음
	};
	//데이터 받기
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
	if (isReservationList) {
		data?.data.map((event) => {
			// const endDate = new Date(event.endDate);
			const endDate = new Date(event.endDate);
			today < endDate &&
				calendarEvent.push({ title: event.roomCategory, start: event.startDate, end: event.endDate, constraint: event.guestName + '님' });
		});
	} else {
		data?.data.map((event) => {
			event.availabilityInfo?.map((availabiity) => {
				const targetDate = new Date(availabiity.date);
				!(today > targetDate) &&
					availabiity.availableRooms &&
					calendarEvent.push({ title: event.roomCategory + ` ${availabiity.availableRooms}개`, date: availabiity.date });
			});
		});
	}

	useCalendarStyle(isReservationList, houseId, calendarFullDate > today ? null : today);

	isSuccess && console.log(data.data, isReservationList ? '예약목록' : '예약가능일');
	if (isError) {
		console.log(error);
		alert('에러 발생');
	}

	return (
		<CalendarContainer $isLoading={isLoading}>
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
				eventClick={(arg) => {
					console.log(arg);
				}}
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

const CalendarContainer = styled.div<{ $isLoading: boolean }>`
	padding: 0 0.5rem;
	.fc-daygrid-day-frame {
		cursor: pointer;
		height: 5.5rem;
	}

	.calendar-unable {
		background-color: lavenderblush;
		cursor: not-allowed;
	}

	cursor: ${(props) => props.$isLoading && 'wait'};
`;
