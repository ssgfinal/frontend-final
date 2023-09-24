import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import KakaoMap from '../../common/KakaoMap';
import { HouseRegiEachWrapper, UserReservationTitle, flexCenter } from '../../../assets/styles';
import styled from 'styled-components';
import { RegiStepProps } from '../../../types';
import { StepMover } from './element';

const AddressFinder: React.FC<RegiStepProps> = ({ goStep, step }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [targetAddress, setTargetAddress] = useState('');

	const handleComplete = (data: Address) => {
		// console.log(data, 'data');
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
		console.log('되나');
		setTargetAddress(fullAddress);
	};

	const openDaumPost = () => {
		setIsOpen(!isOpen);
	};

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소위치</UserReservationTitle>
			<input onClick={openDaumPost} value="검색하기" type="button" />
			<div>{targetAddress}</div>
			{isOpen && (
				<DaumPostContainer>
					<DaumPostcode autoClose={false} onComplete={handleComplete} />
				</DaumPostContainer>
			)}
			{targetAddress && <KakaoMap location={targetAddress} />}
			<StepMover inactive={false} goStep={goStep} step={step} data={{}} />
		</HouseRegiEachWrapper>
	);
};

export default AddressFinder;

const DaumPostContainer = styled.div`
	${flexCenter}
	max-width: 30rem;
`;
