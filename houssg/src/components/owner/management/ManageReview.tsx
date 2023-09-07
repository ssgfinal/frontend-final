import RoomReviewComp from './element/RoomReviewComp';
import { ReviewDummy } from '../../../assets/constant/reservationDummy';

const ManageReview = () => {
	return (
		<div>
			{ReviewDummy.map((review) => (
				<RoomReviewComp review={review} key={review.review_number} />
			))}
		</div>
	);
};

export default ManageReview;
