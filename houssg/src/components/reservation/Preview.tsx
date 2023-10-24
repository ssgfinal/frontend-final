import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userKey } from '../../assets/constant/queryKey';
import { color } from '../../assets/styles';
import { UserReview } from '../../types';
import hourClock from '../../utils/hourClock';
import Rating from '../common/Rating';
import { getMyPreview } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { previewNumber } from '../../store/redux/calendarSlice';

const Preview = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const reservationNumber = useAppSelector(previewNumber);

	// 나의 후기
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: UserReview[] }>(
		[userKey.myPreview, reservationNumber],
		() => getMyPreview(Number(reservationNumber)),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 2 * 60 * 1000,
		},
	);

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		isSuccess && (
			<MyReviewWrapper>
				{data.data.length === 0 ? (
					<GrayFont>작성한 후기가 없습니다.😢</GrayFont>
				) : (
					<MyReviewContainer>
						{data.data.map((review, reservationNumber) => (
							<div key={reservationNumber}>
								<MyReviewBox>
									<HouseBox
										onClick={() => {
											navigate(`/user/houseDetail/${review.accomNumber}`);
											dispatch(closeModal());
										}}
									>
										{review.accomName}&nbsp;({review.reservationNumber})<input type="hidden" value={review.accomNumber} />
										<ArrowBox>&gt;</ArrowBox>
									</HouseBox>
									<RoomBox>{review.roomCategory}</RoomBox>
									<RateBox>
										<Rating rate={review.reviewRating} readonly />
									</RateBox>
									<DateBox>{hourClock(review.reviewCreationTime)}</DateBox>
									<ContentsBox>
										<ContentBox>
											<ImageBox>{review.img && <img src={review.img} />}</ImageBox>
											{review.img ? <TextareaField>{review.reviewContent}</TextareaField> : <NonImageField>{review.reviewContent}</NonImageField>}
										</ContentBox>
									</ContentsBox>
								</MyReviewBox>
								{review.reviewCommentTime && review.reviewComment && (
									<CommentContainer>
										<HouseReviewNickName>💌 숙소 답변</HouseReviewNickName>
										<HouseReviewDate>{hourClock(review.reviewCommentTime)}</HouseReviewDate>
										<HouseReviewContent>{review.reviewComment}</HouseReviewContent>
									</CommentContainer>
								)}
							</div>
						))}
					</MyReviewContainer>
				)}
			</MyReviewWrapper>
		)
	);
};

export default Preview;

const MyReviewWrapper = styled.div`
	width: 100%;
`;

const GrayFont = styled.div`
	margin-top: 1vw;
	color: ${color.darkGrayColor};
	line-height: 5rem;
`;

const MyReviewContainer = styled.div`
	width: 100%;
`;

const MyReviewBox = styled.div`
	margin: 1vw;
	padding: 1vw;
	display: grid;
	grid-template-columns: 1fr 0.5fr 1fr;

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
	margin: 1rem 0;
	padding: 1vw;
	text-align: left;
	display: grid;
	grid-template-columns: 10fr 1fr;

	&:hover {
		cursor: pointer;
		background-color: ${color.color2};
		color: ${color.backColor};
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
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	font-weight: bold;
	padding: 1vw 0 2vw 1vw;
`;

const DateBox = styled.div`
	grid-column-start: 2;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 4;
	padding: 1vw 1vw 1vw 0;
	text-align: right;
`;

const RateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	padding: 0vw 0vw 1vw 1vw;
	width: 50%;
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

const ContentsBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 4;
	grid-row-end: 5;
	text-align: left;
	padding: 0 1vw;
`;

const ContentBox = styled.div`
	/* display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 1vw; */
	line-height: 1.3rem;
	display: flex;
	flex-direction: column;
	@media (max-width: 1024px) {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 400px) {
		line-height: 1rem;
	}
`;

const ImageBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	padding: 0.5rem 1rem;

	img {
		width: 100%;
		border-radius: 0.5rem;
		justify-self: center;
	}
`;

const TextareaField = styled.div`
	width: 100%;
	font-size: 1rem;

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
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const CommentContainer = styled.div`
	margin: 3vw;
	padding: 1vw;
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
