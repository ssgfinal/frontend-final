import { useEffect } from 'react';

export const useFocusRef = (
	ref: React.MutableRefObject<HTMLDivElement | null> | React.MutableRefObject<HTMLInputElement | null>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	array: any[],
	focus?: boolean,
) => {
	useEffect(() => {
		if (ref.current) {
			focus && ref.current.focus();

			ref.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, array);

	return useFocusRef;
};
