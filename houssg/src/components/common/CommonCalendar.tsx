import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listMonth from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EventClickArg } from '@fullcalendar/core/index.js';

const CommonCalendar = () => {
	const calendarRef = useRef();
	// event 추가
	// const onEventAdd = (e) => {
	// 	if (calendarRef.current) {
	// 		const api = calendarRef.current.getApi();
	// 		api.addEvent({
	// 			title: '이사장님과의 약속',
	// 			date: '2023-08-24 12:30',
	// 			constraint: '약속',
	// 		});
	// 	}
	// };

	// 이벤트 클릭시
	const eventCLick = (info: EventClickArg) => {
		// alert("eventClick");
		// alert(JSON.stringify(info.event.start));
		if (info.event.start) {
			const date = new Date(info.event.start);
			const year = date.getFullYear();
			const month = date.getMonth();
			const day = date.getDate();
			const hour = date.getHours();
			const minute = date.getMinutes();
			let promise = `날짜 : ${year}년 ${month + 1}월 ${day}일 ${hour}시 ${minute}분
    `;
			promise += '제목 : ' + info.event.title + '\n';
			promise += '내용 : ' + info.event.constraint;
			alert(promise);
		}
	};

	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		const date = new Date(args.dateStr);
		const year = date.getFullYear();
		let month = date.getMonth() + 1 + '';
		if (month.length < 2) {
			month = '0' + month;
		}
		let day = date.getDate() + '';
		if (day.length < 2) {
			day = '0' + day;
		}
		const selectDate = year + '-' + month + '-' + day;
		alert(selectDate);
	};

	return (
		<div className="calendar">
			<FullCalendar
				headerToolbar={{
					left: 'prev next today', // 좌측버튼
					center: 'title',
					end: 'dayGridMonth timeGridWeek timeGridDay listMonth',

					// end: 'dayGridMonth timeGridWeek timeGridDay listMonth',
				}}
				locale={'ko'} // 한국어
				navLinks={true} // 오른쪽 상단의 day 클릭 대신 날짜를 클릭
				businessHours={true} // 주말을 다른 색으로
				// plugins={[dayGridPlugin, timeGridPlugin, listMonth, interactionPlugin]}
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				eventClick={eventCLick}
				// ref={calendarRef}
				dateClick={handleDateClick}
				events={[
					{
						title: '점심약속',
						date: new Date(), //'2023-08-16
					},
					{
						title: '미팅',
						start: '2023-08-14', //'2023-08-16 까지 적으면 줄이 김
					},
					{
						title: '미팅2',
						start: '2023-08-14 12:30', //'2023-08-16 까지 적으면 줄이 김
					},

					{
						title: '비지니스',
						start: '2023-08-18 12:30:00',
						constraint: '김사장과 복싱',
						end: '2023-08-20 12:30',
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
						backgroundColor: '#ff0000',
					},
				]}
			/>

			<br />
		</div>
	);
};

export default CommonCalendar;
