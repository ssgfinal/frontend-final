import { useState, useEffect } from 'react';
import { TimerProps } from '../../types';

const Timer: React.FC<TimerProps> = ({ time, setTimeEnd }) => {
	const [second, setSecond] = useState(time); // 3분을 초 단위로
	useEffect(() => {
		const interval = setInterval(() => {
			second ? setSecond(second - 1) : (setTimeEnd(true), clearInterval(interval));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [second, setTimeEnd]);

	const formatTime = (second: number) => {
		const minute = Math.floor(second / 60);
		const remainingSecond = second % 60;

		return `${minute > 0 ? `${minute}분` : ''} 
        ${
					second > 0 && minute > 0
						? `${remainingSecond < 10 ? '0' : ''}${remainingSecond}초`
						: `${remainingSecond > 0 ? `${remainingSecond}초` : '시간 초과'}`
				}`;
	};

	return <div>{formatTime(second)}</div>;
};

export default Timer;
