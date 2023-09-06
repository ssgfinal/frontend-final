import React from 'react';
// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import Rating from '../common/Rating';
import { color } from '../../assets/styles';
import { Review } from './Review';

export const HouseReview = () => {
	// const { houseId } = useParams();

	const [activeReview, setActiveReview] = useState('');
	const [activeRate, setActiveRate] = useState<number>(0);

	const handleReveiwTxt = () => {
		console.log(activeRate);
		console.log(activeReview);
	};

	const reviews = [
		{
			id: 1,
			writedate: '2023-12-34',
			writer: '니가 알아서 머할라고',
			roomtype: 'family',
			rate: 3.1,
			content: '리뷰만 지금 몇번 적는건지\n힘들다\n정말\n지긋지긋해',
		},
		{ id: 2, writedate: '2023-12-34', writer: '눕고싶다', roomtype: 'standard', rate: 3.5, content: '리뷰만 지금 2번째 \n진빠진다\n정말\n웩' },
		{
			id: 3,
			writedate: '2023-12-34',
			writer: '지붕만있다면거기가집',
			roomtype: 'twin',
			rate: 3.7,
			content: '아무말 대잔치\n주리님\n오늘따라\n침대가 그리워요',
		},
	];

	return (
		<Wrapper>
			<InputBox>
				{/* 하우스 번호 : {houseId}{' '} */}

				<Rating rate={activeRate} setRate={setActiveRate} />
				<Input style={{ whiteSpace: 'pre-wrap' }}>
					<Textarea placeholder="후기를 작성해주세요" onChange={(e) => setActiveReview(e.target.value)} />

					<Button onClick={handleReveiwTxt}>등록</Button>
				</Input>
			</InputBox>
			<ReviewList>
				{reviews.map((review) => (
					<Review key={review.id} review={review} />
				))}
			</ReviewList>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem 0;
`;
const InputBox = styled.div`
	margin-bottom: 3rem;
`;
const Input = styled.div`
	margin: 1rem 0;
	display: grid;
	grid-template-columns: 7fr 1fr;
	grid-gap: 1rem;
`;

const Textarea = styled.textarea`
	padding: 10px;
	border-color: ${color.color1};
	border-radius: 0.5rem;
	resize: none;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${color.color1};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 0.5rem;
		box-shadow: inset 0px 0px 5px white;
	}
`;

const Button = styled.button`
	background-color: ${color.color1};
	color: white;
	border: solid;
	border-radius: 1rem;
	border-color: ${color.color1};
`;

const ReviewList = styled.div`
	white-space: pre-wrap;
`;
