import { useState, useRef } from 'react';
import { ownerRegiImg } from '../../../assets/images';

const BusinessRegi = () => {
	const [isRegistered, setIsRegistered] = useState(false);
	const imgRef = useRef<HTMLInputElement | null>(null);
	const [imgFile, setImgFile] = useState<string | null>(null);

	const saveImgFile = () => {
		if (imgRef.current?.files) {
			const file = imgRef.current.files[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImgFile(reader.result + ''); //string으로 buffer형식 타입변환
			};
		}
	};

	return (
		<div>
			{!isRegistered ? (
				<div>
					<input type="file" accept="image/*" onChange={saveImgFile} ref={imgRef} />

					<br />
					<img src={imgFile ? imgFile : ownerRegiImg} alt="프로필 이미지" width="300px" object-fit="contain" />
					<button onClick={() => setIsRegistered(true)}>이미지전송</button>
				</div>
			) : (
				<div>
					<div>상호 : 서버로 부터 받은 값 </div>
					<div>숙소명 :서버로 부터 받은 값</div>
				</div>
			)}
		</div>
	);
};

export default BusinessRegi;
