import styled from 'styled-components';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../common/Rating';
import { color } from '../../assets/styles';
import hourClock from '../../utils/hourClock';

// TODO: 서버 > 나의 후기 목록
// import api from '../../api/api';
// import { userUrl } from '../../assets/constant/urlConst';

interface ReviewList {
	reviews: {
		reviewNumber: number;
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
	}[];
}

const MyReview: React.FC<ReviewList> = ({ reviews }) => {
	const navigate = useNavigate();

	// const [myReview, setMyReview] = useState(reviews);

	//TODO: 403 error >> payload : 닉네임
	/* 백로그 >> 2023-10-09T09:08:23.627Z  WARN 1 --- [nio-3200-exec-7] 
	.w.s.m.s.DefaultHandlerExceptionResolver :
	 Resolved [org.springframework.web.bind.MissingServletRequestParameterException:
		 Required request parameter 'nickname' for method parameter type String is not present]
	*/

	// const myReviewList = async (userNickName: string) => {
	// 	try {
	// 		const response = await api.post(userUrl.myReview, { nickname: userNickName });
	// 		console.log('resp' + response);
	// 		console.log('resp.data' + response.data);
	// 		setMyReview(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// useEffect(() => {
	// 	const userNickName = sessionStorage.getItem('nickname');
	// 	myReviewList(userNickName!);
	// TODO: 서버 연결 후 수정
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<MyReviewWrapper>
			{reviews.length === 0 ? (
				<GrayFont>작성한 후기가 없습니다.😢</GrayFont>
			) : (
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
								<DateBox>{hourClock(review.writeDate)}</DateBox>
								<ContentsBox>
									<ContentBox>
										<ImageBox>{review.reviewImage && <img src={review.reviewImage} />}</ImageBox>
										{review.reviewImage ? <TextareaField>{review.content}</TextareaField> : <NonImageField>{review.content}</NonImageField>}
									</ContentBox>
								</ContentsBox>
							</MyReviewBox>
							{review.commentDate && (
								<CommentContainer>
									<HouseReviewNickName>💌 숙소 답변</HouseReviewNickName>
									<HouseReviewDate>{hourClock(review.commentDate)}</HouseReviewDate>
									<HouseReviewContent>{review.commentContent}</HouseReviewContent>
								</CommentContainer>
							)}
						</div>
					))}
				</MyReviewContainer>
			)}
		</MyReviewWrapper>
	);
};

export default MyReview;

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
	padding: 0 1vw;
`;

const ContentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 1vw;
	line-height: 1.3rem;

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
