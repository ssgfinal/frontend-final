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
import { EventClickArg } from '@fullcalendar/core/index.js';
import { setCalendarModalInfo } from '../../../store/redux/calendarSlice';

const OwnerCalendar: React.FC<CommonCalendarProps> = ({ currentDate, initailData, houseId, isReservationList }) => {
	const dispatch = useAppDispatch();
	const calendarRef = useRef<FullCalendar | null>(null);
	// const calenderApi = calendarRef.current?.getApi().view.title; // 혹시 몰라 놔둠
	const [calendarDate, setCalendarDate] = useState(currentDate);
	const calendarEvent: { title: string; constraint?: string; start?: string; end?: string; date?: string; id: string }[] = [];

	const today = new Date();
	today.setHours(9, 0, 0, 0);
	const calendarFullDate = new Date(calendarDate.year + '-' + calendarDate.month);

	const modalOpen = (type: 'reserve#event' | 'available#event' | string) => {
		dispatch(openModal({ modalComponent: 'ownerReservation', modalSize: 400, modalText: type }));
	};

	const handleDateClick = (args: DateClickArg) => {
		dispatch(setCalendarModalInfo({ calendarInfo: '넘오가나' }));

		modalOpen(isReservationList ? 'reserve#date#' + args.dateStr : 'available#date#' + args.dateStr);

		console.log(args.dateStr); // 날짜정보
		console.log(args.dayEl.innerText); // 이벤트가 있으면 innerText가 /n이 들어가 있음
	};

	const handleEventClick = (arg: EventClickArg) => {
		dispatch(setCalendarModalInfo({ calendarInfo: '넘오가나 이벤트' }));

		console.log(arg.event._def.title);
		console.log(arg.event._instance?.range);
		console.log(arg.event.id);
		modalOpen(isReservationList ? 'reserve#event' : 'available#event');
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

	if (isReservationList) {
		data?.data.map((event) => {
			// const endDate = new Date(event.endDate);
			const endDate = new Date(event.endDate);
			today < endDate &&
				calendarEvent.push({
					title: event.roomCategory,
					start: event.startDate,
					end: event.endDate,
					constraint: event.guestName + '님',
					id: event.reservationNumber + '',
				});
		});
	} else {
		data?.data.map((event) => {
			event.availabilityInfo?.map((availabiity, index) => {
				const targetDate = new Date(availabiity.date);
				!(today > targetDate) &&
					availabiity.availableRooms &&
					calendarEvent.push({
						title: event.roomCategory + ` ${availabiity.availableRooms}개`,
						date: availabiity.date,
						id: event.roomNumber + '-' + index,
					});
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
					left: 'prev next',
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
				eventClick={handleEventClick}
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

	.fc-event-title-container {
		cursor: pointer;
	}

	cursor: ${(props) => props.$isLoading && 'wait'};
`;
