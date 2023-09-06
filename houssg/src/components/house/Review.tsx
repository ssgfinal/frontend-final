import React from 'react';
import Rating from '../common/Rating';
import { styled } from 'styled-components';
import { color } from '../../assets/styles';
interface ReviewProps {
	review: {
		id: number;
		writedate: string;
		writer: string;
		roomtype: string;
		rate: number;
		content: string;
	};
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
	return (
		<Wrapper key={review.id}>
			<ReviewHeader>
				<Left>
					<CommonTitle>작성자</CommonTitle>
					<WriterContent>{review.writer}</WriterContent>
					<CommonTitle>객실 종류</CommonTitle>
					<CommonContent>{review.roomtype}</CommonContent>
				</Left>
				{/* <CommonTitle>작성 일자</CommonTitle> */}
				<CommonContent>{review.writedate}</CommonContent>
			</ReviewHeader>
			<Rating readonly rate={review.rate} />
			<ReviewContent>{review.content}</ReviewContent>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: solid 0.05rem ${color.color1};
	border-radius: 1rem;
	margin: 1rem 0;

	& > div {
		padding: 0.5rem; /* 원하는 패딩 값으로 설정하세요 */
	}
`;

const ReviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
`;

const Left = styled.div`
	display: flex;
	width: 25rem;
`;

const CommonTitle = styled.div`
	background-color: ${color.color1};
	border: solid;
	color: white;
	border-radius: 0.5rem;

	padding: 0.3rem;
`;

const CommonContent = styled.div`
	padding: 0.5rem;
`;

const WriterContent = styled(CommonContent)`
	text-align: left;
	width: 10rem;
`;
const ReviewContent = styled.div`
	text-align: left;
`;
