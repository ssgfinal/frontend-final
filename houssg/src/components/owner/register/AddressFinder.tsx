import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import KakaoMap from '../../common/KakaoMap';

const AddressFinder = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [targetAddress, setTargetAddress] = useState('');
	const handleComplete = (data: Address) => {
		console.log(data, 'data');
		let fullAddress = data.address;
		let extraAddress = '';
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		setIsOpen(false);
		setTargetAddress(fullAddress);
	};

	const openDaumPost = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<input readOnly placeholder="검색해주세요" value={targetAddress} />
			<input onClick={openDaumPost} value="검색" type="button" />
			{isOpen && <DaumPostcode autoClose={false} onComplete={handleComplete} />}
			<KakaoMap />
		</div>
	);
};

export default AddressFinder;
