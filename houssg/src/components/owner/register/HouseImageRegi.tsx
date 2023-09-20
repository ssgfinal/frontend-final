import { HouseRegiEachWrapper, UserReservationTitle } from '../../../assets/styles';
import { ImageUploader } from '../../common';

const HouseImageRegi = () => {
	return (
		<HouseRegiEachWrapper>
			<UserReservationTitle>숙소 이미지 등록</UserReservationTitle>

			<ImageUploader width="300px" height="400px" />
		</HouseRegiEachWrapper>
	);
};

export default HouseImageRegi;
