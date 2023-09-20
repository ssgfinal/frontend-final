import { HouseRegiEachWrapper } from '../../../assets/styles';
import { ImageUploader } from '../../common';

const HouseImageRegi = () => {
	return (
		<HouseRegiEachWrapper>
			숙소 이미지 등록
			<ImageUploader width="300px" height="400px" />
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;
