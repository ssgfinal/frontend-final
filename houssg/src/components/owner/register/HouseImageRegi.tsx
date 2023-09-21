import { HouseRegiEachWrapper, UserReservationTitle } from '../../../assets/styles';
import { RegiStepProps } from '../../../types';
import { ImageUploader } from '../../common';

const HouseImageRegi: React.FC<RegiStepProps> = ({ goStep, step }) => {
	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 이미지 등록</UserReservationTitle>

			<ImageUploader width="300px" height="400px" />
			<button
				onClick={() => {
					goStep(1);
				}}
			>
				{step}에서 이전
			</button>
			<button
				onClick={() => {
					goStep(3);
				}}
			>
				{step}에서 다음
			</button>
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;
