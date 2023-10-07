import { useEffect, useState } from 'react';

export const useCalWindowWidth = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [throttle, setThrottle] = useState(false);

	useEffect(() => {
		let handler: number;

		const handleResize = () => {
			if (throttle) return;

			setThrottle(true);

			handler = setTimeout(() => {
				setWindowSize(window.innerWidth);
				setThrottle(false);
			}, 300);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(handler);
		};
	}, []);

	return windowSize;
};
