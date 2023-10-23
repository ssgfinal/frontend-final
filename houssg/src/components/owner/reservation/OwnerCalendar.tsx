import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import styled from 'styled-components';
import useCalendarStyle from '../../../hooks/useCalendarStyle';
import { useState } from 'react';
import { CalendarEvent, CommonCalendarProps, OwnerReservedRoom } from '../../../types';
import { color } from '../../../assets/styles';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../../assets/constant';
import { getHouseReservation, getReservableRoomList } from '../../../helper';
import { useRef } from 'react';
import { changeYearMonth } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { openModal } from '../../../store/redux/modalSlice';
import { EventClickArg } from '@fullcalendar/core/index.js';
import {
	ownerHouseId,
	setCalendarAvailableRoom,
	setCalendarEvent,
	setCalendarReservatinInfo,
	setDayCalendarEvents,
} from '../../../store/redux/calendarSlice';

const OwnerCalendar: React.FC<CommonCalendarProps> = ({ currentDate, initailData, isReservationList }) => {
	const dispatch = useAppDispatch();
	const houseId = useAppSelector(ownerHouseId);
	const calendarRef = useRef<FullCalendar | null>(null);
	const [calendarDate, setCalendarDate] = useState(currentDate);
	const calendarEvent: CalendarEvent[] = [];
	const today = new Date();
	today.setHours(9, 0, 0, 0);
	const calendarFullDate = new Date(calendarDate.year + '-' + calendarDate.month);

	const modalOpen = (type: 'reserve#event' | 'available#event' | string) => {
		dispatch(openModal({ modalComponent: 'ownerReservation', modalSize: 400, modalText: type }));
	};

	const handleDateClick = (args: DateClickArg) => {
		const clickedMonth = Number(args.dateStr.substring(5, 7));
		if (calendarDate.month !== clickedMonth) {
			return;
		}
		const clickedDate = args.date;
		clickedDate.setHours(9, 0, 0, 0);
		if (clickedDate < today) {
			return;
		}

		if (isReservationList) {
			const targetEvent = calendarEvent.filter((event) => {
				const eventStartDate = event.start; // 이벤트의 시작 날짜
				const eventEndDate = event.end; // 이벤트의 종료 날짜
				if (eventStartDate && eventEndDate) {
					return eventStartDate <= args.dateStr && eventEndDate > args.dateStr;
				}
			});

			dispatch(setDayCalendarEvents({ dateCalendarEvents: { date: args.dateStr, events: targetEvent } }));
			modalOpen('reserve#date#' + args.dateStr);
			return;
		}

		if (!isReservationList) {
			const targetEventList = calendarEvent.filter((event) => event.date === args.dateStr);
			const dateAvailableRooms = targetEventList.map(({ id, date, title }) => {
				const nameAmount = title.split(' : ');
				const roomName = nameAmount[0];
				const amount = nameAmount[1];
				return { roomName, amount, date, roomId: Number(id) };
			});

			dispatch(setCalendarAvailableRoom({ dateAvailableRooms }));
			modalOpen('available#date#' + args.dateStr);
		}
	};

	const handleEventClick = (arg: EventClickArg) => {
		// 이벤트인 경우
		const eventId = arg.event.id; //숙소아이디 or 예약아이디
		const eventTitleArray = arg.event.title.split(' : '); // 객실이름 : 예약자명 or 객실이름 : 개수
		const eventRoomName = eventTitleArray[0];
		if (!isReservationList) {
			const date = arg.event.startStr;
			const eventRoomLeft = eventTitleArray[1];
			dispatch(setCalendarEvent({ roomId: Number(eventId), roomName: eventRoomName, date, amount: eventRoomLeft }));
			modalOpen('available#event');
			return;
		}

		if (isReservationList) {
			const eventRange = arg.event._instance?.range;
			const start = eventRange?.start.toLocaleDateString().replaceAll('. ', '-').slice(0, -1);
			const end = eventRange?.end.toLocaleDateString().replaceAll('. ', '-').slice(0, -1);
			const guestName = eventTitleArray[1];
			const guestNumber = arg.event.constraint;
			if (!start && !end) {
				alert('비정상적인 오류');
				return;
			}
			dispatch(
				setCalendarReservatinInfo({
					reservationInfo: { start, end, eventId, eventRoomName, guestName, guestNumber, calendarDate: calendarDate.year + '-' + calendarDate.month },
				}),
			);
			modalOpen('reserve#event');
		}
	};

	const { isLoading, data, isSuccess, isError } = useQuery<{ data: OwnerReservedRoom[] }>(
		[isReservationList ? ownerKey.getReservationData : ownerKey.reserveAvailability, houseId, calendarDate.year + '-' + calendarDate.month],
		() =>
			isReservationList
				? getHouseReservation(houseId, calendarDate.year + '-' + calendarDate.month)
				: getReservableRoomList(houseId, calendarDate.year + '-' + calendarDate.month),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 5 * 60 * 1000,
			placeholderData: { data: initailData },
		},
	);

	if (isReservationList) {
		data?.data.map((event) => {
			const endDate = new Date(event.endDate);
			const guestData = event.guestName.split('++');
			today < endDate &&
				calendarEvent.push({
					title: event.roomCategory + ' : ' + guestData[0],
					start: event.startDate,
					end: event.endDate,
					constraint: guestData[1] ? guestData[1] : event.guestPhone,
					id: event.reservationNumber + '',
				});
		});
	} else {
		data?.data.map((event) => {
			event.availabilityInfo?.map((availabiity) => {
				const targetDate = new Date(availabiity.date);

				!(today > targetDate) &&
					calendarEvent.push({
						title: event.roomCategory + ` : ${availabiity.availableRooms}개`,
						date: availabiity.date,
						id: event.roomNumber + '',
					});
			});
		});
	}

	useCalendarStyle(isReservationList, houseId, calendarFullDate > today ? null : today);

	if (isError) {
		alert('에러 발생');
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isSuccess) {
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
								setCalendarDate(changeYearMonth(calendarDate.year, calendarDate.month, 'prev'));
								calendarRef.current?.getApi().prev();
							},
						},
						next: {
							text: 'next',
							click: () => {
								setCalendarDate(changeYearMonth(calendarDate.year, calendarDate.month, 'next'));
								calendarRef.current?.getApi().next();
							},
						},
						today: {
							text: 'today',
							click: () => {
								setCalendarDate(currentDate);
								calendarRef.current?.getApi().today();
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
	}
};

export default OwnerCalendar;

const CalendarContainer = styled.div<{ $isLoading: boolean }>`
	padding: 0 0.5rem;
	.fc-day-other > div {
		cursor: default !important;
	}

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
