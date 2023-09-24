const hourClock = (checkHour: string) => {
	const hours = checkHour.split(':');
	const checkTimes = hours.join('');

	return checkTimes;
};

export default hourClock;
