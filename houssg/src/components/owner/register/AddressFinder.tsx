import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

const AddressFinder = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [targetAddress, setTargetAddress] = useState('');
	const handleComplete = (data: Address) => {
		console.log(data);
		let fullAddress = data.address;
		let extraAddress = '';
		// console.log(data);
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
		</div>
	);
};

export default AddressFinder;
