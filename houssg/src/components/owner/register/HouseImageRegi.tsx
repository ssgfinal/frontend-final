import { useState } from 'react';
import { HouseRegiEachWrapper, UserReservationTitle, SmallIndicatorText } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { ImageUploader } from '../../common';
import { StepMover } from './element';
import styled from 'styled-components';
import { base64ToFile } from '../../../utils';
import { nonImage } from '../../../assets/icons';

const HouseImageRegi: React.FC<RegiStepProps> = ({ goStep, step, funnelState }) => {
	const [houseImage, setHouseImage] = useState(funnelState?.houseImage ? funnelState.houseImage : '');
	const width = '400px';
	const height = '300px';
	const [houseImageFile, setHouseImageFile] = useState(funnelState?.houseImageFile ? funnelState.houseImageFile : null);

	const onAddHouseImageFile = (file: string) => {
		setHouseImageFile(base64ToFile(file, funnelState?.name + ''));
	};

	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 이미지 등록</UserReservationTitle>

			<ImageUploader width={width} height={height} setImage={setHouseImage} setImgFile={onAddHouseImageFile}>
				{houseImage ? (
					<>
						<CroppedImg width={width} height={height} src={houseImage} alt="cropped" />
						<SmallIndicatorText>이미지 클릭시 교체</SmallIndicatorText>
					</>
				) : (
					<>
						<div>업로드 하기</div>
						<CroppedImg width={width} height={height} src={nonImage} alt="등록해주세요" />
					</>
				)}
			</ImageUploader>

			<StepMover
				inactive={!houseImage && !houseImageFile}
				goStep={goStep}
				step={step}
				data={{ houseImage, houseImageFile: houseImageFile ? houseImageFile : undefined }}
			/>
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;

const CroppedImg = styled.img`
	cursor: pointer;
`;
