import { useState } from 'react';
import { ownerRegiImg } from '../../../assets/images';
import { useImageConverter } from '../../../hooks';

const BusinessRegi = () => {
	const [isRegistered, setIsRegistered] = useState(false);
	const { imgRef, imgFile, setIncodedImg } = useImageConverter();

	return (
		<div>
			{!isRegistered ? (
				<div>
					<input type="file" accept="image/*" onChange={setIncodedImg} ref={imgRef} />

					<br />
					<img src={imgFile ? imgFile : ownerRegiImg} alt="사업자 이미지" width="300px" object-fit="contain" />
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
