import { useState, useRef } from 'react';
import { styled } from 'styled-components';
import Rating from '../../../common/Rating';
import { declarationIcon } from '../../../../assets/icons';
import { useAppDispatch } from '../../../../hooks';
import { openModal } from '../../../../store/redux/modalSlice';
import { color } from '../../../../assets/styles';
import hourClock from '../../../../utils/hourClock';

interface ReviewType {
	review: {
		review_writer: string;
		review_number: number;
		reservation_number: number;
		review_content: string;
		rating: number;
		report_status: number;
		creation_time: string;
		roomType: string; // 방 타입
		reviewImage: string | null; // 리뷰 이미지
		comment: {
			text: string;
			date: string;
		} | null;
		member_id: number;
	};
}

const RoomReviewComp: React.FC<ReviewType> = ({ review }) => {
	const commentContent = useRef<HTMLTextAreaElement | null>(null);
	const [activeReview, setActiveReview] = useState('');
	const [overReview, setOverReview] = useState(false);

	const onCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const activeReviewValue = e.target.value;

		if (activeReviewValue.length <= 250) {
			setOverReview(false);
			setActiveReview(activeReviewValue);
		} else {
			setOverReview(true);
		}
	};

	const dispatch = useAppDispatch();
	const modalOpen = (component: string, message: string | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message }));
	};

	const onComment = () => {
		const commentValue = commentContent.current?.value;
		console.log(commentValue);
	};

	return (
		<>
			<ReviewWrapper>
				<ReviewContainer>
					<ReviewWriter>{review.review_writer}</ReviewWriter>
					<DeclarationBox
						src={declarationIcon}
						onClick={() => {
							modalOpen('declaration', null);
						}}
					></DeclarationBox>
					{/* <span>신고</span> */}
					<ReviewDate>{hourClock(review.creation_time)}</ReviewDate>
					<ReviewRoomType>{review.roomType}</ReviewRoomType>
					<RatingBox>
						<Rating rate={review.rating} readonly></Rating>
					</RatingBox>
					<ContentsBox>
						<ContentBox>
							<ImageBox>{review.reviewImage && <img src={review.reviewImage} />}</ImageBox>
							{review.reviewImage ? <ImageField>{review.review_content}</ImageField> : <NonImageField>{review.review_content}</NonImageField>}
						</ContentBox>
					</ContentsBox>
					{review.comment ? (
						<CommentContainer>
							<NickName>💌 나의 답변</NickName>
							<CommentDate>{hourClock(review.comment.date)}</CommentDate>
							<CommentText>{review.comment.text}</CommentText>
						</CommentContainer>
					) : (
						<CommentContainer>
							<CommentTextarea
								placeholder={`답글을 작성해주세요\n( 최대 250자 )`}
								rows={9}
								maxLength={250}
								ref={commentContent}
								onChange={onCharacters}
								value={activeReview}
							/>
							<OverTextWarning>{overReview ? <> ※ 최대 글자수 250자를 초과하였습니다.</> : <></>}</OverTextWarning>
							<CommentSubmitButton onClick={onComment}>답글달기</CommentSubmitButton>
						</CommentContainer>
					)}
				</ReviewContainer>
			</ReviewWrapper>
		</>
	);
};

export default RoomReviewComp;

const ReviewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 0.5rem;
	margin: 0 0 0.5rem 0;
`;

const ReviewContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	display: grid;
	margin: 0.5rem;
`;

const ReviewWriter = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	text-align: left;
	padding-bottom: 0.3rem;
	color: ${color.color1};
	font-weight: bold;

	@media (max-width: 430px) {
		font-size: 1rem;
	}

	@media (max-width: 320px) {
		font-size: 0.8rem;
	}
`;

const ReviewDate = styled.div`
	color: ${color.darkGrayColor};
	grid-column-start: 1;
	grid-column-end: 5;
	padding-bottom: 0.2rem;
	text-align: left;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.5rem;
	}
`;

const ReviewRoomType = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	padding-bottom: 0.2rem;
	color: ${color.darkGrayColor};
	text-align: left;

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

const DeclarationBox = styled.img`
	grid-column-start: 4;
	grid-column-end: 5;
	cursor: pointer;
	width: 1rem;
	justify-self: right;

	@media (max-width: 900px) {
		width: 0.8rem;
	}
`;

const RatingBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 4;
	grid-row-end: 5;
	padding-bottom: 0.3rem;
	width: 38%;
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
		font-size: 0.5rem;
		ul {
			margin-right: -15vw;
			justify-self: left;
			font-size: 0.7rem;
			text-align: left;
		}
	}
`;

const CommentContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 6;
	grid-row-end: 7;
	display: grid;
	grid-template-columns: 1fr 2fr;
	margin: 1rem 0 1rem 0;
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
	color: ${color.darkGrayColor};
	text-align: right;
`;
const CommentText = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	line-height: 0.8rem;
	padding: 0.5rem 0 0 0;
`;

const ContentsBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 5;
	grid-row-end: 6;
	text-align: left;
	padding: 0 0.5rem 0 0.5rem;
`;

const ContentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 0.5rem;
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

const ImageField = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	width: 100%;
	font-size: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const NonImageField = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	width: 100%;
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
`;

const CommentTextarea = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	margin: 0.3rem 0 1rem 0;
	padding: 0.5rem;
	border-color: ${color.color1};
	border-radius: 0.5rem;
	outline: none;
	resize: none;
	&::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const OverTextWarning = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	color: ${color.red};
	opacity: 0.8;
	text-align: left;
	font-size: small;
	padding-bottom: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const CommentSubmitButton = styled.button`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	background-color: ${color.color1};
	color: ${color.backColor};
	border: 1px solid ${color.color1};
	border-radius: 0.5rem;
	border-color: ${color.color1};
	font-size: 1rem;
	cursor: pointer;
	padding: 0.3rem;

	&:hover {
		font-weight: bold;
		border: 1px solid ${color.color2};
		background-color: ${color.color2};
	}

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
