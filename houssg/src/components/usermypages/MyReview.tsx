import styled from 'styled-components';
import { color } from '../../assets/styles';
import Rating from '../common/Rating';
import { ChangeEvent } from 'react';

interface ReviewList {
	reviews: Array<{
		reservationNumber: number;
		houseId: number;
		accomName: string;
		userId: string;
		writedate: string;
		outdoorView?: string[] | string;
		rating: number;
		content: string;
	}>;
}

const MyReview: React.FC<ReviewList> = ({ reviews }) => {
	const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = event.target;
		textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 위해 초기화
		textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이로 설정
	};

	return (
		<MyReviewWrapper>
			<MyReviewContainer>
				{reviews.map((review, index) => (
					<div key={index}>
						<MyReviewBox>
							<HouseBox>
								{review.accomName}&nbsp;({review.reservationNumber})
							</HouseBox>
							<WriterBox>{review.userId}</WriterBox>
							<RateBox>
								<Rating rate={review.rating} readonly />
							</RateBox>
							<DateBox>{review.writedate}</DateBox>
							<ContentsBox>
								<ContentBox>
									{/* TODO: src 오류 추후 수정 */}
									<ImageBox>{review.outdoorView && <img src={review.outdoorView} />}</ImageBox>
									{/* <TextBox>{review.content}</TextBox> */}

									{/* TODO : readonly인데 value 오류가 생김 */}
									{review.outdoorView ? (
										<TextareaField cols={63} onChange={handleTextareaChange} value={review.content}>
											{review.content}
										</TextareaField>
									) : (
										<NonImageField cols={120} onChange={handleTextareaChange} value={review.content}>
											{review.content}
										</NonImageField>
									)}
								</ContentBox>
							</ContentsBox>
						</MyReviewBox>
					</div>
				))}
			</MyReviewContainer>
		</MyReviewWrapper>
	);
};

export default MyReview;

const MyReviewWrapper = styled.div``;

const MyReviewContainer = styled.div``;

const MyReviewBox = styled.div`
	margin: 1vw;
	padding: 1vw;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 1fr 0.5fr 1fr;
	grid-template-rows: 2fr 1fr 1fr 4fr;
`;

const HouseBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 1;
	grid-row-end: 2;
	background-color: ${color.unSelectColor};
	border-radius: 0.5rem;
	align-self: center;
	padding: 1vw;
	text-align: left;
`;

const WriterBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
`;

const DateBox = styled.div`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 4;
	text-align: right;
`;

const RateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	text-align: left;
	font-size: 0.8rem;

	ul {
		justify-self: left;
		width: 1vw;
		font-size: 0.8rem;
		text-align: center;
	}
`;

const ContentsBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 4;
	grid-row-end: 5;

	text-align: left;

	img {
		width: 25vw;
		justify-self: center;
	}
`;

const ContentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 10px;
`;

const ImageBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
`;

// TODO : readonly인데 value 오류가 생김
const TextareaField = styled.textarea`
	grid-column-start: 2;
	grid-column-end: 3;
	width: 100%;
	outline: none;
	border: none;
	background-color: transparent;
	resize: none;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar {
		height: 5px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${color.unSelectColor};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0px 0px 5px ${color.backColor};
	}
`;

const NonImageField = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 3;
	width: 100%;
	outline: none;
	border: none;
	background-color: transparent;
	resize: none;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar {
		height: 5px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${color.unSelectColor};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0px 0px 5px ${color.backColor};
	}
`;
