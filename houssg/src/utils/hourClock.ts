const hourClock = (checkHour: string) => {
	const year = checkHour.slice(0, 4);
	const month = checkHour.slice(5, 7);
	const day = checkHour.slice(8, 10);
	const hour = checkHour.slice(11, 13);
	const minuete = checkHour.slice(14, 16);

	const checkTimes = year + '년\n' + month + '월\n' + day + '일\n' + '\n' + hour + '시\n' + minuete + '분';

	return checkTimes;
};

export default hourClock;
