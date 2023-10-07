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

const pxToRemWithResizer = (px: string, ratio: number) => {
	const rootFontNum = parseFloat(rootFontSize.slice(0, -2)); // rootFontSize를 숫자로 변환

	const returnNum = (ratio * parseFloat(px)) / rootFontNum;
	if (isNaN(returnNum)) {
		alert('숫자로 된 값만 입력됩니다. windowWidth 그대로 단위없이 넣어주세요');
		return '16rem';
	} else {
		return returnNum + 'rem';
	}
};

const ratioConverter = (origin: string, ratio: number, unit: string) => {
	const ratioOriginNum = parseFloat(origin.slice(0, -unit.length)); // rootFontSize를 숫자로 변환
	return ratioOriginNum * ratio + unit;
};
export { webpImageIncoder, pxToRemWithResizer, ratioConverter };
