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

const convertKoreanDateToISO = (dateString: string) => {
	const months: { [key: string]: string } = {
		'1월': '01',
		'2월': '02',
		'3월': '03',
		'4월': '04',
		'5월': '05',
		'6월': '06',
		'7월': '07',
		'8월': '08',
		'9월': '09',
		'10월': '10',
		'11월': '11',
		'12월': '12',
	};

	const match = dateString.match(/(\d{4})년 (\d{1,2})월/);
	if (match) {
		const year = match[1];
		const month = months[match[2] + '월'];
		return `${year}-${month}`;
	} else {
		return '실패';
	}
};

export { webpImageIncoder, pxToRem, base64ToFile, doRefFocus, convertKoreanDateToISO };
