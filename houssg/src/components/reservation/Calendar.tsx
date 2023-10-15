import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

// import { eventList } from '../../assets/constant/reservationDummy';
import { UserTypeObject } from '../../types';
import styled from 'styled-components';
import useCalendarStyle from '../../hooks/useCalendarStyle';
import { color } from '../../assets/styles';
import { useToast } from '../../hooks';
import { ToastContainer } from 'react-toastify';

const Calendar: React.FC<UserTypeObject> = ({ type }) => {
	useCalendarStyle(type);
	const eventList = [
		{
			date: '2023-10-16',
			availablerooms: 2,
		},
		{
			date: '2023-10-19',
			availablerooms: 2,
		},
		{
			date: '2023-10-23',
			availablerooms: 0,
		},
	];

	const events = eventList;

	const showToast = useToast;

	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		const found = eventList.find((e) => e.date === args.dateStr);
		console.log('선택한 날짜에 해당하는 객체 > ', found);
		if (found && found.availablerooms > 0) {
			console.log('예약 가능');
		} else {
			console.log('예약 불가');
			// alert('예약이 이미 다 찬 날짜입니다.');
			showToast('빈방이 없습니다.', 'warning');
			// CommonToast('빈방이 없습니다.', 'error');
			// CommonToast('빈방이 없습니다.', 'ro?');
		}
	};

	return (
		<ToastContainer>
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
		</ToastContainer>
	);
};

export default Calendar;

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
