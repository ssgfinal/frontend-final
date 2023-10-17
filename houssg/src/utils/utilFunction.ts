import Resizer from 'react-image-file-resizer';
import { rootFontSize } from '../assets/styles';

const webpImageIncoder = (file: File) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file, // Is the file of the image which will resized.
			1000, // Is the maxWidth of the resized new image.
			1000, // Is the maxHeight of the resized new image.
			'webp', // Is the compressFormat of the resized new image.
			100, // Is the quality of the resized new image.
			0, // Is the degree of clockwise rotation to apply to uploaded image.
			(uri) => {
				// Is the callBack function of the resized new image URI.
				resolve(uri);
			},
			'base64',
		);
	});

const base64ToFile = (base64: string, name: string) => {
	const byteCharacters = atob(base64.split(',')[1]);
	const byteArrays = [];
	for (let i = 0; i < byteCharacters.length; i++) {
		byteArrays.push(byteCharacters.charCodeAt(i));
	}
	const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/webp' });
	const file = new File([blob], name + '.webp', { type: 'image/webp' });
	return file;
};

const pxToRem = (pxUnitNum: number) => {
	const rootFontNum = parseFloat(rootFontSize.slice(0, -2)); // rootFontSize를 숫자로 변환
	const returnNum = pxUnitNum / rootFontNum;
	return returnNum;
};

const doRefFocus = (
	ref: React.MutableRefObject<HTMLDivElement | null> | React.MutableRefObject<HTMLInputElement | null>,
	options?: { behavior: ScrollBehavior; block: ScrollLogicalPosition; inline: ScrollLogicalPosition },
) => {
	if (ref.current) {
		if (options) {
			ref.current.scrollIntoView(options);
		} else {
			ref.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		}
	}
};

const changeYearMonth = (currentYear: number, currentMonth: number, prevOrNext: 'prev' | 'next') => {
	let returnDate = { year: currentYear, month: currentMonth };
	if (prevOrNext === 'next') {
		currentMonth === 12 ? (returnDate = { year: currentYear + 1, month: 1 }) : (returnDate = { year: currentYear, month: currentMonth + 1 });
	} else {
		currentMonth === 1 ? (returnDate = { year: currentYear - 1, month: 12 }) : (returnDate = { year: currentYear, month: currentMonth - 1 });
	}
	return returnDate;
};

export { webpImageIncoder, pxToRem, base64ToFile, doRefFocus, changeYearMonth };
