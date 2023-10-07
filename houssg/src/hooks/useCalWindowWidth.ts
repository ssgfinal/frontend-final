import { useEffect, useState } from 'react';
import { useDebounce } from '.';

export const useCalWindowWidth = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth + '');
	const debouncedValue = useDebounce(window.innerWidth + '', 300);
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(debouncedValue);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [debouncedValue]);

	return windowSize;
};
