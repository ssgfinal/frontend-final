import { useState } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { ImageUploader } from '../../common';
import { StepMover } from './element';
import { SmallIndicatorText } from '../../../assets/styles/StyledComponents';
import styled from 'styled-components';

const HouseImageRegi: React.FC<RegiStepProps> = ({ goStep, step, funnelState }) => {
	const [houseImage, setHouseImage] = useState(funnelState?.houseImage ? funnelState.houseImage : '');
	const width = '300px';
	const height = '400px';

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 이미지 등록</UserReservationTitle>

			<ImageUploader width={width} height={height} setImage={setHouseImage}>
				{houseImage ? (
					<>
						<CroppedImg width={width} height={height} src={houseImage} alt="cropped" />
						<SmallIndicatorText>이미지 클릭시 교체</SmallIndicatorText>
					</>
				) : (
					<>
						<div>업로드 하기</div>
						<CroppedImg width={width} height={height} src={''} alt="등록해주세요" />
					</>
				)}
			</ImageUploader>

			<StepMover inactive={!houseImage} goStep={goStep} step={step} data={{ houseImage }} />
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;

const CroppedImg = styled.img`
	cursor: pointer;
`;
