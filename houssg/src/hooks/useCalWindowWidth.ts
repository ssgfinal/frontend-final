import { useEffect, useState } from 'react';
import { useDebounce } from '.';

export const useCalWindowWidth = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const debouncedValue = useDebounce(window.innerWidth + '', 200);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(parseFloat(debouncedValue));
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [debouncedValue]);

	return windowSize;
};
