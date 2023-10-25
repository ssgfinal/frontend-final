import React from 'react';
import Rating from '../common/Rating';
import { styled } from 'styled-components';
import { color } from '../../assets/styles';
import { ReviewProps } from '../../types';
import hourClock from '../../utils/hourClock';

export const Review: React.FC<ReviewProps> = ({ review }) => {
	return (
		<Wrapper key={review.reviewNumber}>
			<WriteDate>{hourClock(review.reviewCreationTime)}</WriteDate>
			<OneLine>
				<Set>
					<Title>작성자</Title>
					<Content>{review.nickname}</Content>
				</Set>
				<Set>
					<Title>객실</Title>
					<Content>{review.roomCategory}</Content>
				</Set>
			</OneLine>
			<RateBox>
				<Rating readonly rate={review.reviewRating} />
			</RateBox>

			<ReviewContent $hasImage={review.img ? true : false}>
				{review.img && <Img src={review.img} />}
				<ReviewText>{review.reviewContent}</ReviewText>
			</ReviewContent>

			{/* TODO: 댓글 입력,수정에서 빈문자열일 땐 등록안 되게 막는게 맞을 듯, 지금은 임시방편으로 && 걸어놓음 */}
			{review.reviewComment && review.reviewComment.length !== 0 && (
				<CommentContainer>
					<HouseReviewNickName>💌 숙소 답변</HouseReviewNickName>
					<HouseReviewDate>{review.reviewCommentTime && hourClock(review.reviewCommentTime)}</HouseReviewDate>
					<HouseReviewContent>{review.reviewComment}</HouseReviewContent>
				</CommentContainer>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	border-radius: 1rem;
	margin-bottom: 2rem;
	padding: 2rem;
`;

const WriteDate = styled.div`
	text-align: right;
	margin: 0.5rem;
	margin-top: 0;
	font-size: 0.8rem;
`;

const OneLine = styled.div`
	@media (min-width: 650px) {
		display: grid;
		grid-template-columns: 50% 50%;
	}
	@media (max-width: 650px) {
		display: grid;
		grid-template-columns: 100%;
		font-size: 0.8rem;
	}

	margin-bottom: 1rem;
`;

const RateBox = styled.div`
	width: 25%;
	margin-bottom: 2rem;
`;
const Set = styled.div`
	display: grid;
	grid-template-columns: 35% 65%;
	grid-gap: 1rem;
	@media (max-width: 720px) {
		display: grid;
		grid-template-columns: 40% 60%;
	}
`;

const Title = styled.div`
	background-color: ${color.color1};
	border: solid;
	color: white;
	border-radius: 0.5rem;
	padding: 0.7rem;
`;

const Content = styled.div`
	align-self: center;
	text-align: left;
	padding: 0.5rem;
`;

const ReviewContent = styled.div<{ $hasImage: boolean }>`
	margin-top: 1rem;
	display: grid;
	grid-gap: 2rem;

	@media (min-width: 650px) {
		grid-template-columns: ${(props) => (props.$hasImage ? `40% 60%` : `100%`)};
	}

	@media (max-width: 650px) {
		grid-template-columns: 100%;
	}
`;

const Img = styled.img`
	width: 100%;
	border-radius: 1rem;
`;

const ReviewText = styled.div`
	@media (min-width: 650px) {
		padding: 1rem 0;
	}

	text-align: left;
`;

const CommentContainer = styled.div`
	margin: 2rem 0;
	padding: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr;
	background-color: ${color.lightGrayColor};
	color: ${color.basicColor};
	border-radius: 0.5rem;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const HouseReviewNickName = styled.div`
	text-align: left;
	padding: 1vw 0;
	font-weight: bold;
`;

const HouseReviewDate = styled.div`
	text-align: right;
	padding: 1vw 0;
`;

const HouseReviewContent = styled.div`
	text-align: left;
	padding: 1vw 0;
`;
