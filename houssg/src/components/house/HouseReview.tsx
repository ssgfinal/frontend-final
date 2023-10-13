import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { Review } from './Review';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';
import { ReviewType } from '../../types';
import { color } from '../../assets/styles';

export const HouseReview = () => {
	const { houseId } = useParams();
	const [reviewList, setReviewList] = useState<ReviewType[]>([]);

	useEffect(() => {
		console.log('useEffect 실행');
		try {
			api.get(userUrl.reviewList, { params: { accomNumber: houseId } }).then(({ data }) => {
				setReviewList(data);
			});
		} catch {
			console.log('error');
		}
	}, []);

	return (
		<Wrapper>
			{reviewList && reviewList.length === 0 ? (
				<ZeroReview>등록된 리뷰가 없습니다.</ZeroReview>
			) : (
				<ReviewList>{reviewList && reviewList.map((review) => <Review key={review.reviewNumber} review={review} />)}</ReviewList>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem 0;
`;

const ZeroReview = styled.div`
	border: solid 0.05rem ${color.color1};
	border-radius: 1rem;
	margin: 1rem 0;
	padding: 2rem;
`;
const ReviewList = styled.div`
	white-space: pre-wrap;
`;
