import { useEffect } from 'react';
import { userType } from '../types';

const useCalendarStyle = (type: userType) => {
	useEffect(() => {
		if (type === 'owner') {
			const parentDiv = document.getElementsByClassName('fc-daygrid-day-frame');
			for (let i = 0; i < parentDiv.length; i++) {
				if (parentDiv[i].children[1].children.length > 1) {
					parentDiv[i].classList.add('calendar-unable');
				}
			}
		}
	}, [type]);
};

export default useCalendarStyle;
