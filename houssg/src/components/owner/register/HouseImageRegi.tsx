import { HouseRegiEachWrapper, UserReservationTitle } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { ImageUploader } from '../../common';
import { StepMover } from './element';

const HouseImageRegi: React.FC<RegiStepProps> = ({ goStep, step }) => {
	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 이미지 등록</UserReservationTitle>

			<ImageUploader width="300px" height="400px" />
			<StepMover inactive={false} goStep={goStep} step={step} data={{}} />
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;
