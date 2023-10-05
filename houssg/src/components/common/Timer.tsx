import { useState, useEffect } from 'react';
import { TimerProps } from '../../types';

const Timer: React.FC<TimerProps> = ({ time, setTimeStatus, timeStatus }) => {
	const [second, setSecond] = useState(time); // 3분을 초 단위로
	useEffect(() => {
		if (timeStatus === 'start') {
			setSecond(time);
			setTimeStatus('restricted');
		}

		const interval = setInterval(() => {
			second < time - 10 && setTimeStatus('process');
			second ? setSecond(second - 1) : (setTimeStatus('end'), clearInterval(interval));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [second, setTimeStatus, timeStatus, time]);

	const formatTime = (second: number) => {
		const minute = Math.floor(second / 60);
		const remainingSecond = second % 60;
		const renderMinute = minute > 0 ? `${minute}분 ` : '';
		const renderSecond =
			second > 0 && minute > 0
				? `${remainingSecond < 10 ? '0' : ''}${remainingSecond}초`
				: `${remainingSecond > 0 ? `${remainingSecond}초` : '시간 초과'}`;

		return renderMinute + renderSecond;
	};

	return <div>{formatTime(second)}</div>;
};

export default Timer;
