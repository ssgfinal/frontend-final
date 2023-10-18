import { useEffect } from 'react';
import { OwnerReservedRoom, UserType } from '../types';

const useCalendarStyle = (type: UserType, data: OwnerReservedRoom[] | undefined) => {
	useEffect(() => {
		if (type === 'owner') {
			// const parentDiv = document.getElementsByClassName('fc-daygrid-day-frame');
			// for (let i = 0; i < parentDiv.length; i++) {
			// 	// console.log(parentDiv[i].children[1].children);
			// 	if (parentDiv[i].children[1].children.length <= 1) {
			// 		parentDiv[i].classList.add('calendar-unable');
			// 	}
			// }
		}
	}, [type, data]);
};

export default useCalendarStyle;
