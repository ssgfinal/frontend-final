import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import Rating from '../../../common/Rating';
import { declarationIcon } from '../../../../assets/icons';
import { useAppDispatch } from '../../../../hooks';
import { openModal } from '../../../../store/redux/modalSlice';
import { color } from '../../../../assets/styles';
import hourClock from '../../../../utils/hourClock';
import { OwnerHouseReviewType } from '../../../../types';
import { ownerKey } from '../../../../assets/constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReviewComment } from '../../../../helper';

const RoomReviewComp: React.FC<{ accomNumber: number; review: OwnerHouseReviewType }> = ({ accomNumber, review }) => {
	const queryClient = useQueryClient();
	const [isEditMode, setIsEditMode] = useState(false);
	const newReplyText = useRef<HTMLTextAreaElement | null>(null);

	const dispatch = useAppDispatch();
	const modalOpen = (component: string, message: string | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message }));
	};

	const onOpenReportModal = () => {
		modalOpen('declaration', `${accomNumber}/&&${review.reviewNumber}`);
	};

	const onOpenReplyModal = () => {
		modalOpen('houseComment', `${accomNumber}/&&${review.reviewNumber}`);
	};

	const { mutate } = useMutation({
		mutationFn: (text: string) => patchReviewComment(review.reviewNumber, text),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ownerKey.houseReview, accomNumber] });
			alert('수정완료');
			setIsEditMode(false);
		},
		onError: () => {
			alert('수정실패');
		},
	});

	const onEditComment = () => {
		const newReplayValue = newReplyText.current?.value;
		if (newReplayValue === review.reviewComment) {
			setIsEditMode(false);
			return;
		}

		if (!newReplayValue) {
			return;
		} else {
			mutate(newReplayValue);
		}
	};

	return (
		<>
			<ReviewWrapper>
				<ReviewContainer>
					<ReviewDate>{hourClock(review.reviewCreationTime)}</ReviewDate>
					<ReviewWriter>{review.nickname}</ReviewWriter>
					<DeclarationContainer>
						{!review.reportStatus ? (
							<ReportStatustext>신고중...</ReportStatustext>
						) : (
							<>
								<DeclarationBox src={declarationIcon} onClick={onOpenReportModal} alt="신고하기"></DeclarationBox>
								&nbsp;<span>신고하기</span>
							</>
						)}
					</DeclarationContainer>
					<ReviewRoomType>{review.roomCategory}</ReviewRoomType>
					<RatingBox>
						<Rating rate={review.reviewRating} readonly></Rating>
					</RatingBox>
					<ContentsBox>
						<ContentBox>
							<ImageBox>{review.img && <img src={review.img} />}</ImageBox>
							{review.img ? <ImageField>{review.reviewContent}</ImageField> : <NonImageField>{review.reviewContent}</NonImageField>}
						</ContentBox>
					</ContentsBox>
					{review.reviewComment ? (
						<CommentContainer>
							<NickName>💌 나의 답변</NickName>
							{isEditMode ? (
								<>
									<CommentDate>
										<span onClick={onEditComment}>수정완료</span>
										<span onClick={() => setIsEditMode(false)}>수정취소</span>
									</CommentDate>
									<CommentTextarea
										placeholder={`답글을 작성해주세요.\n( 최대 250자 )`}
										rows={4}
										maxLength={250}
										ref={newReplyText}
										defaultValue={review.reviewComment}
									/>
								</>
							) : (
								<>
									<CommentDate>
										<span onClick={() => setIsEditMode(true)}>수정하기</span>
										{hourClock(review.reviewCommentTime)}
									</CommentDate>
									<CommentText>{review.reviewComment}</CommentText>
								</>
							)}
						</CommentContainer>
					) : (
						<CommentButtonContainer>
							<CommentSubmitButton onClick={onOpenReplyModal}>답글 작성하기&nbsp;&nbsp;&gt;</CommentSubmitButton>
						</CommentButtonContainer>
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
	grid-row-start: 1;
	grid-row-end: 2;
	padding: 0 0 0.5rem 0.3rem;
	font-size: 0.8rem;
	text-align: left;
	align-self: center;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 430px) {
		font-size: 0.6rem;
	}
`;

const ReviewRoomType = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	padding-bottom: 0.2rem;
	font-size: 0.8rem;
	color: ${color.darkGrayColor};
	text-align: left;

	@media (max-width: 430px) {
		font-size: 0.7rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const DeclarationContainer = styled.div`
	padding: 0 0 0.5rem 0.3rem;
	grid-column-start: 4;
	grid-column-end: 5;
	grid-row-start: 1;
	grid-row-end: 2;
	justify-self: right;

	span {
		font-size: 0.3rem;
		color: ${color.darkGrayColor};
	}
`;

const DeclarationBox = styled.img`
	cursor: pointer;
	width: 1rem;
	align-self: center;

	@media (max-width: 900px) {
		width: 0.8rem;
	}
`;

const RatingBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 4;
	grid-row-end: 5;
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
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
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
	padding-bottom: 0.8rem;
	text-align: left;
	font-weight: bold;
`;
const CommentDate = styled.div`
	font-size: 0.7rem;
	color: ${color.darkGrayColor};
	text-align: right;

	span {
		font-size: 0.7rem;
		color: ${color.red};
		font-weight: 600;
		cursor: pointer;
		margin-right: 0.5rem;
		@media screen and (max-width: 500px) {
			margin-right: 0.4rem;
			font-weight: 400;
		}
	}
`;
const CommentText = styled.div`
	text-align: left;
	line-height: 1rem;
	font-size: 0.9rem;
	padding: 0.5rem 0 0 0;
	grid-column: span 2;
`;

const CommentTextarea = styled.textarea`
	text-align: left;
	line-height: 0.8rem;
	grid-column: span 2;
	padding: 0.5rem;
	/* border-color: ${color.color1}; */
	border-radius: 0.5rem;
	outline: none;
	resize: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ContentsBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 5;
	grid-row-end: 6;
	text-align: left;
	margin: 1.5rem 0 1.5rem 0;
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
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const CommentButtonContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 6;
	grid-row-end: 7;
	display: grid;
	margin: 1rem 0 1rem 0;
	padding: 0.5rem;

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

const CommentSubmitButton = styled.button`
	grid-column-start: 1;
	grid-column-end: 5;
	grid-row-start: 3;
	grid-row-end: 4;
	justify-self: right;
	border: none;
	background-color: ${color.backColor};
	color: ${color.color1};
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	border-radius: 0.5rem;
	padding: 0.3rem;
	text-align: left;

	&:hover {
		font-weight: bold;
		color: ${color.color1};
	}

	@media (max-width: 900px) {
		font-size: 0.9rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const ReportStatustext = styled.div`
	color: ${color.red};
	font-size: 0.7rem;
	font-weight: 600;
	margin-right: 0.2rem;
`;
