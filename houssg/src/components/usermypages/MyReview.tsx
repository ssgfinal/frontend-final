import styled from 'styled-components';
import { color } from '../../assets/styles';
import Rating from '../common/Rating';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReviewList {
	reviews: Array<{
		reservationNumber: number;
		houseId: number;
		accomName: string;
		userId: string;
		roomtype: string;
		writedate: string;
		reviewImage: string | null;
		rating: number;
		content: string;
	}>;
}

const MyReview: React.FC<ReviewList> = ({ reviews }) => {
	const navigate = useNavigate();

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
							<HouseBox
								onClick={() => {
									navigate(`/user/house/${review.houseId}`);
								}}
							>
								{review.accomName}&nbsp;({review.reservationNumber})<input type="hidden" value={review.houseId} />
								<ArrowBox>&gt;</ArrowBox>
							</HouseBox>
							<RoomBox>{review.roomtype}</RoomBox>
							<RateBox>
								<Rating rate={review.rating} readonly />
							</RateBox>
							<DateBox>{review.writedate}</DateBox>
							<ContentsBox>
								<ContentBox>
									<ImageBox>{review.reviewImage && <img src={review.reviewImage} />}</ImageBox>

									{review.reviewImage ? (
										<TextareaField cols={63} rows={5} onChange={handleTextareaChange} value={review.content} readOnly={true}>
											{review.content}
										</TextareaField>
									) : (
										<NonImageField cols={120} rows={10} onChange={handleTextareaChange} value={review.content} readOnly={true}>
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
	//border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 1fr 0.5fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 5fr;

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

const HouseBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 1;
	grid-row-end: 2;
	background-color: ${color.unSelectColor};
	border-radius: 0.3rem;
	align-self: center;
	padding: 1vw;
	text-align: left;
	display: grid;
	grid-template-columns: 10fr 1fr;
`;

const ArrowBox = styled.div`
	text-align: right;
`;

const RoomBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	font-weight: bold;
	color: ${color.color1};
	padding: 1vw 1vw 0vw 1vw;
`;

const DateBox = styled.div`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 4;
	padding: 1vw 1vw 0vw 0vw;
	text-align: right;
`;

const RateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	padding: 0vw 0vw 0vw 1vw;
	text-align: left;
	font-size: 1rem;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
		ul {
			justify-self: left;
			font-size: 0.8rem;
			text-align: left;
		}
	}

	@media (max-width: 320px) {
		grid-column-start: 1;
		grid-column-end: 4;
		font-size: 0.5rem;
		ul {
			margin-right: -15vw;
			grid-column-start: 1;
			grid-column-end: 2;
			justify-self: left;
			font-size: 0.7rem;
			text-align: left;
		}
	}
`;

const ContentsBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 4;
	grid-row-end: 5;
	text-align: left;
	padding: 0vw 1vw 0vw 1vw;
`;

const ContentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 1vw;
`;

const ImageBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;

	img {
		width: 25vw;
		justify-self: center;
	}

	@media (max-width: 900px) {
		img {
			width: 20vw;
			transition: width 0.2s;
		}
	}

	@media (max-width: 760px) {
		img {
			width: 25vw;
			transition: width 0.2s;
		}
	}

	@media (max-width: 660px) {
		img {
			width: 25vw;
			transition: width 0.2s;
		}
	}

	@media (max-width: 560px) {
		img {
			width: 20vw;
			transition: width 0.2s;
		}
	}
`;

const TextareaField = styled.textarea`
	grid-column-start: 2;
	grid-column-end: 3;
	width: 100%;
	outline: none;
	border: none;
	background-color: transparent;
	resize: none;
	font-family: monospace;
	font-size: 0.8rem;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}

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
	font-family: monospace;
	font-size: 0.8rem;

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}

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
