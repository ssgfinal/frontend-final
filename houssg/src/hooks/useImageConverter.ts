import { useRef, useState } from 'react';
import { webpImageIncoder } from '../utils';

export const useImageConverter = () => {
	const imgRef = useRef<HTMLInputElement | null>(null);
	const [imgFile, setImgFile] = useState<string | null>(null);
	const setIncodedImg = async () => {
		if (imgRef.current?.files) {
			const file = imgRef.current.files[0];
			const webpfile = await webpImageIncoder(file);
			setImgFile(webpfile + ''); // unknown type을 string으로 변환
		}
	};
	return { imgRef, imgFile, setIncodedImg };
};
