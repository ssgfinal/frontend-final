import RoomReviewComp from './element/RoomReviewComp';
import { ReviewDummy } from '../../../assets/constant/reservationDummy';
import styled from 'styled-components';

const ManageReview = () => {
	return (
		<Wrapper>
			{ReviewDummy.map((review) => (
				<RoomReviewComp review={review} key={review.review_number} />
			))}
		</Wrapper>
	);
};

export default ManageReview;

const Wrapper = styled.div`
	padding-top: 3rem;
`;
