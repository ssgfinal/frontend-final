import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import styled from 'styled-components';

import { HouseRegiEachWrapper, UserReservationTitle, flexCenter, SmallIndicatorText } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { StepMover } from './element';
import { KakaoMap } from '../../common';

const AddressFinder: React.FC<RegiStepProps> = ({ goStep, step, funnelState }) => {
	const [targetAddress, setTargetAddress] = useState(funnelState?.targetAddress ? funnelState.targetAddress : '');

	const handleComplete = (data: Address) => {
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
		setTargetAddress(fullAddress);
	};

	const reOpenDaumPost = () => {
		setTargetAddress('');
	};

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소위치</UserReservationTitle>
			{targetAddress ? (
				<>
					<UserAddress onClick={reOpenDaumPost}>{targetAddress}</UserAddress>
					<SmallIndicatorText>주소 클릭시 변경</SmallIndicatorText>
				</>
			) : (
				<DaumPostContainer>
					<DaumPostcode autoClose={false} onComplete={handleComplete} />
				</DaumPostContainer>
			)}
			{targetAddress && <KakaoMap location={targetAddress} />}
			<StepMover inactive={!targetAddress} goStep={goStep} step={step} data={{ targetAddress }} />
		</HouseRegiEachWrapper>
	);
};

export default AddressFinder;

const DaumPostContainer = styled.div`
	${flexCenter}
	max-width: 30rem;
`;

const UserAddress = styled.div`
	font-weight: 700;
	max-width: 600px;
	width: 100%;
	flex-wrap: wrap;
`;
