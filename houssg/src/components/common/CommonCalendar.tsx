import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { eventList } from '../../assets/constant/reservationDummy';
import { userTypeObject } from '../../types';
import styled from 'styled-components';
import useCalendarStyle from '../../hooks/useCalendarStyle';
import { color } from '../../assets/styles';

const CommonCalendar: React.FC<userTypeObject> = ({ type }) => {
	useCalendarStyle(type);

	const events = eventList;

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
				locale={'ko'} // 한국어
				businessHours={true} // 주말을 다른 색으로
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={handleDateClick}
				events={events}
				aspectRatio={2}
				dayMaxEvents={3}
				eventBackgroundColor={color.color3}
				eventBorderColor="transparent"
				// contentHeight={800}
			/>
		</CalendarContainer>
	);
};

export default CommonCalendar;

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
