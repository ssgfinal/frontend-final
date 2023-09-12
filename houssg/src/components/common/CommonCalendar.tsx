// import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listMonth from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const CommonCalendar = () => {
	const eventList = [
		{
			title: '점심약속',
			date: new Date(), //'2023-08-16'
			allDay: true,
		},
		{
			title: '점심약속',
			date: '2023-09-13',
			allDay: true,
		},
		{
			title: '비지니스',
			start: '2023-08-18 12:30:00',
			constraint: '김사장과 복싱',
			end: '2023-08-20 12:30',
			allDay: true,
		},
		{
			title: '워크샵',
			start: '2023-08-17 12:30:00',
			constraint: '팔협지 또 일등이야',
			end: '2023-08-22 12:30',
		},
		{
			title: '데이트',
			start: '2023-08-27 12:30:00',
			constraint: '영화관람',
		},
	];

	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		console.log(args.dateStr); // 날짜정보
		console.log(args.dayEl.innerText); // 이벤트가 있으면 innerText가 /n이 들어가 있음
	};

	return (
		<div className="calendar">
			<FullCalendar
				headerToolbar={{
					left: 'prev next', // 좌측버튼
					center: 'title',
					end: 'today',
					// end: 'dayGridMonth timeGridWeek timeGridDay listMonth',
				}}
				locale={'ko'} // 한국어
				businessHours={true} // 주말을 다른 색으로
				// plugins={[dayGridPlugin, timeGridPlugin, listMonth, interactionPlugin]}
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				dateClick={handleDateClick}
				events={eventList}
				// eventBackgroundColor={'red'}
			/>

			<br />
		</div>
	);
};

export default CommonCalendar;
