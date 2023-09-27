// import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { Review } from './Review';
import { accomodation } from '../../assets/icons';

export const HouseReview = () => {
	// const { houseId } = useParams();

	const reviews = [
		{
			id: 1,
			writedate: '2023-12-34',
			writer: '니가 알아서 머할라고',
			roomtype: 'family',
			rate: 3.1,
			content: `ㅁㄷ럼;재댜럼재ㅑㄷ러매ㅑㄷㅈ러;맺댜럼;ㅐ쟈덞;ㅐㅈ댜ㅓㄻ;ㅐㅈ댜러;ㅁ재댜러\nㅐㅁ냐덞;ㅐㅈ댜ㅓㄹ;매쟈덞;재댜럼;재댜러\nㅁ니ㅣ아러;매쟏ㄻ;ㅐ쟏러;맺댜럼;재댜러\nㅁ;ㅈ대러ㅑ;ㅁ재댜러;매쟏러;맺댜러\nㅁ;ㅐㅈ댜럼;재댜럼;ㅐㅈ댜ㅓㄹ;ㅁ잳랴ㅓㅁ;ㅈ대랴ㅓㅁ;ㅐㅈ댤더ㅐ\n맺덜;매쟏러;ㅁ재댜럼;재댜러;매쟈ㅓㄷㄹ;맺댜러\nㅁ;재ㅐㄷㄹ더ㅐㅑㅁ;잳랴ㅓㅁ;잳러ㅑ;맺댜러;ㅁ재댜러\n;ㅐㅈ댜`,
			img: accomodation,
		},
		{ id: 2, writedate: '2023-12-34', writer: '눕고싶다', roomtype: 'standard', rate: 3.5, content: '리뷰만 지금 2번째 \n진빠진다\n정말\n웩' },
		{
			id: 3,
			writedate: '2023-12-34',
			writer: '지붕만있다면거기가집',
			roomtype: 'twin',
			rate: 3.7,
			content: '아무말 대잔치\n주리님\n오늘따라\n침대가 그리워요',
			img: accomodation,
		},
	];

	return (
		<Wrapper>
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

const ReviewList = styled.div`
	white-space: pre-wrap;
`;
