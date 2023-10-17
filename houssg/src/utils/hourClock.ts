const hourClock = (checkHour: string) => {
	const year = checkHour.slice(0, 4);
	const month = checkHour.slice(5, 7);
	const day = checkHour.slice(8, 10);
	const hour = checkHour.slice(11, 13);
	const minuete = checkHour.slice(14, 16);

	const checkTimes = year + '.' + month + '.' + day + '  ' + hour + ':' + minuete + '';

	return checkTimes;
};

export default hourClock;
