// import { useRef } from 'react';
import { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listMonth from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { eventList } from '../../assets/constant/reservationDummy';
import './CommonCalendar.css';

const CommonCalendar = () => {
	const calendarRef = useRef<FullCalendar>(null);
	useEffect(() => {
		const parentDiv = document.getElementsByClassName('fc-daygrid-day-frame');
		console.log(parentDiv);
		for (let i = 0; i < parentDiv.length; i++) {
			// console.log(parentDiv[i].children);
			console.log(parentDiv[i].children[0].children[0].ariaLabel);
			console.log(parentDiv[i].children[1].children);
			if (parentDiv[i].children[1].children.length > 1) {
				// 이 조건을 변경해야할듯
				parentDiv[i].classList.add('calendar-unable');
			}
		}
	}, []);

	const events = eventList;

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
				events={events}
				ref={calendarRef}
				// eventBackgroundColor={'red'}
			/>

			<br />
		</div>
	);
};

export default CommonCalendar;
