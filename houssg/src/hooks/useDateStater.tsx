import { useState } from 'react';

export const useDateStater = () => {
	const today = new Date();
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const setNextYear = () => {
		setCurrentYear(currentYear + 1);
	};

	const setPrevYear = () => {
		setCurrentYear(currentYear - 1);
	};

	return { currentYear, setNextYear, setPrevYear };
};
