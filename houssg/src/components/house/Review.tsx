import React from 'react';
import Rating from '../common/Rating';
import { styled } from 'styled-components';
import { color } from '../../assets/styles';
import { ReviewProps } from '../../types';

export const Review: React.FC<ReviewProps> = ({ review }) => {
	return (
		<Wrapper key={review.reviewNumber}>
			<WriteDate>{review.reviewCreationTime}</WriteDate>
			<OneLine>
				<Title>작성자</Title>
				<Content>{review.nickname}</Content>
				<Title>객실</Title>
				<Content>{review.roomCategory}</Content>
			</OneLine>
			<RateBox>
				<Rating readonly rate={review.reveiwRating} />
			</RateBox>
			<ReviewContent>
				{review.img ? <Img src={review.img} /> : <></>}
				<ReviewText>{review.reviewContent}</ReviewText>
			</ReviewContent>
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
	text-align: left;
	margin: 0.5rem;
	margin-top: 0;
`;

const OneLine = styled.div`
	@media (min-width: 650px) {
		display: flex;
	}
	@media (max-width: 650px) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		font-size: 0.7rem;
	}

	margin-bottom: 0.5rem;
`;

const RateBox = styled.div`
	width: 25%;
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
	padding: 0.5rem;
`;

const ReviewContent = styled.div`
	margin-top: 1rem;
	display: grid;
	grid-gap: 2rem;
	@media (min-width: 650px) {
		grid-template-columns: 1fr 2fr;
	}
	@media (max-width: 650px) {
		grid-template-columns: 1fr;
	}
`;

const Img = styled.img`
	width: 100%;
	border-radius: 1rem;
`;

const ReviewText = styled.div`
	@media (min-width: 650px) {
		padding: 1rem;
	}

	text-align: left;
`;
