import React from 'react';
import { styled } from 'styled-components';
import Rating from '../../../common/Rating';
import { Button } from 'antd';
import { declarationIcon } from '../../../../assets/icons';
import { useAppDispatch } from '../../../../hooks';
import { openModal } from '../../../../store/redux/modalSlice';
import { color } from '../../../../assets/styles';

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
	const dispatch = useAppDispatch();
	const modalOpen = (component: string, message: string | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message }));
	};

	return (
		<>
			<ReviewContainer>
				<ReviewSubContainer>
					<div>{review.review_writer}</div>
					<ReviewAligner>
						<Rating rate={review.rating} readonly></Rating>

						{/* {review.report_status} */}
						<DeclarationBox
							src={declarationIcon}
							onClick={() => {
								modalOpen('declaration', null);
							}}
						></DeclarationBox>
					</ReviewAligner>
				</ReviewSubContainer>
				<ReviewSubContainer>
					<div>{review.review_content}</div>
					<div>{review.creation_time}</div>
					{!review.comment && <Button>답글달기</Button>}
				</ReviewSubContainer>
			</ReviewContainer>
			{review.comment && (
				<CommentContainer>
					<NickName>💌 숙소 답변</NickName>
					<CommentDate>{review.comment.date}</CommentDate>
					<CommentText>{review.comment.text}</CommentText>
				</CommentContainer>
			)}
		</>
	);
};

export default RoomReviewComp;

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${color.color1};
	margin: 1rem;
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

const DeclarationBox = styled.img`
	cursor: pointer;
	width: 1rem;
`;

const CommentContainer = styled.div`
	display: grid;
	margin: 1rem;
	padding: 0.5rem;
	background-color: ${color.lightGrayColor};
	color: ${color.basicColor};
	border-radius: 0.5rem;
	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.5rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const NickName = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 2;
	text-align: left;
	font-weight: bold;
`;
const CommentDate = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	text-align: right;
`;
const CommentText = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	padding: 0.5rem 0 0 0;
`;
