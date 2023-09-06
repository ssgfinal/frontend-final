import React from 'react';
import { styled } from 'styled-components';
import Rating from '../../../common/Rating';
import { Button } from 'antd';
interface ReviewType {
	review: {
		review_writer: string;
		review_number: number;
		reservation_number: number;
		review_content: string;
		rating: number;
		report_status: number;
		creation_time: string;
		comment: {
			text: string;
			date: string;
		} | null;
		member_id: number;
	};
}

const RoomReviewComp: React.FC<ReviewType> = ({ review }) => {
	return (
		<>
			<ReviewContainer>
				<ReviewSubContainer>
					<div>{review.review_writer}</div>
					<ReviewAligner>
						<Rating rate={review.rating} readonly></Rating>
						<div>{review.report_status}</div>
					</ReviewAligner>
				</ReviewSubContainer>
				<ReviewSubContainer>
					<div>{review.review_content}</div>
					<div>{review.creation_time}</div>
					{!review.comment && <Button>답글달기</Button>}
				</ReviewSubContainer>
			</ReviewContainer>
			{review.comment && (
				<ReviewContainer>
					<ReviewSubContainer>
						<div> L사장님 : </div>
						<div>{review.comment.text}</div>
						<div>{review.comment.date}</div>
					</ReviewSubContainer>
				</ReviewContainer>
			)}
		</>
	);
};

export default RoomReviewComp;

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ReviewSubContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const ReviewAligner = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3vw;
`;
