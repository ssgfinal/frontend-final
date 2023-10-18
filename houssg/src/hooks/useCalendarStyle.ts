import { useEffect } from 'react';

const useCalendarStyle = (isReservationList: boolean, houseId: number, today: Date | null) => {
	useEffect(() => {
		const parentDiv = document.getElementsByClassName('fc-daygrid-day-frame');
		const dateDiv = document.getElementsByClassName('fc-daygrid-day-number');
		if (today) {
			for (let i = 0; i < dateDiv.length; i++) {
				const targetDate = dateDiv[i].getAttribute('aria-label'); //ex ) 2023년 10월 1일
				if (targetDate) {
					const convertedString = targetDate.replace('년', '-').replace('월', '-').replace('일', '');
					const convertedDate = new Date(convertedString);
					convertedDate.setHours(9, 0, 0, 0);
					convertedDate < today && parentDiv[i].classList.add('calendar-unable');
				}
			}
		}

		if (!isReservationList) {
			// console.log(parentDiv);
			// for (let i = 0; i < parentDiv.length; i++) {
			// 	if (parentDiv[i].children[1].children.length <= 1) {
			// 		parentDiv[i].classList.add('calendar-unable');
			// 	}
			// }
		}
	}, [isReservationList, houseId, today]);
};

export default useCalendarStyle;
