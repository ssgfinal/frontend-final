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
		roomType: string;
		writeDate: string;
		reviewImage: string | null;
		rating: number;
		content: string;
		commentDate: string | null;
		commentContent: string | null;
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
							<RoomBox>{review.roomType}</RoomBox>
							<RateBox>
								<Rating rate={review.rating} readonly />
							</RateBox>
							<DateBox>{review.writeDate}</DateBox>
							<ContentsBox>
								<ContentBox>
									<ImageBox>{review.reviewImage && <img src={review.reviewImage} />}</ImageBox>

									{review.reviewImage ? (
										<TextareaField cols={63} rows={8} onChange={handleTextareaChange} value={review.content} readOnly={true}>
											{review.content}
										</TextareaField>
									) : (
										<NonImageField cols={120} rows={8} onChange={handleTextareaChange} value={review.content} readOnly={true}>
											{review.content}
										</NonImageField>
									)}
								</ContentBox>
							</ContentsBox>
						</MyReviewBox>
						{review.commentContent && (
							<CommentContainer>
								<HouseReviewNickName>💌 숙소 답변</HouseReviewNickName>
								<HouseReviewDate>{review.commentDate}</HouseReviewDate>
								<HouseReviewContent>{review.commentContent}</HouseReviewContent>
							</CommentContainer>
						)}
					</div>
				))}
			</MyReviewContainer>
		</MyReviewWrapper>
	);
};

export default MyReview;

const MyReviewWrapper = styled.div`
	width: 100%;
`;

const MyReviewContainer = styled.div`
	width: 100%;
`;

const CommentContainer = styled.div`
	margin: 0vw 3vw 3vw 3vw;
	padding: 1vw 1vw 1vw 1vw;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr;
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

const HouseReviewNickName = styled.div`
	text-align: left;
	padding: 0vw 0vw 1vw 0vw;
	font-weight: bold;
`;

const HouseReviewDate = styled.div`
	text-align: right;
	padding: 0vw 0vw 1vw 0vw;
`;

const HouseReviewContent = styled.div`
	text-align: left;
	padding: 1vw 0vw 0vw 0vw;
`;

const MyReviewBox = styled.div`
	margin: 1vw;
	padding: 1vw;
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
	background-color: ${color.color1};
	color: ${color.backColor};
	font-weight: bold;
	border-radius: 0.3rem;
	align-self: center;
	padding: 1vw;
	text-align: left;
	display: grid;
	grid-template-columns: 10fr 1fr;

	&:hover {
		cursor: pointer;
	}

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
		width: 100%;
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
	font-size: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.5rem;
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
	font-size: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.5rem;
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
