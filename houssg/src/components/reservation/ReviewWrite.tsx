import { useState } from 'react';
import styled from 'styled-components';
import { color, SmallIndicatorText } from '../../assets/styles';
import Rating from '../common/Rating';
import { closeModal, modalProps } from '../../store/redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { photo } from '../../assets/icons';
import { base64ToFile } from '../../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setReview, setReviewFormData } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';
import { ImageUploader } from '../common';

const ReviewWrite = () => {
	const [reviewContent, setReviewContent] = useState<string>('');
	const [reviewRating, setReviewRating] = useState<number>(0);
	const [overReview, setOverReview] = useState(false);
	const [appendImg, setAppendImg] = useState(false);
	const [img, setImg] = useState('');
	const [file, setImgFile] = useState<File>();

	const width = '100%';
	const height = '40%';

	const dispatch = useAppDispatch();
	const reservation = useAppSelector(modalProps);

	const reservationNumber = Number(reservation![0]);
	const accomNumber = Number(reservation![1]);
	const roomNumber = Number(reservation![2]);

	const onAddImgFile = (img: string) => {
		return setImgFile(base64ToFile(img, 'review'));
	};

	const onCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const reviewContent = e.target.value;
		setReviewContent(reviewContent);

		if (reviewContent.length < 250) {
			setOverReview(false);
		} else {
			setOverReview(true);
		}
	};

	// 후기 등록
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (formData: FormData) => setReview(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myReservation] });
			alert('등록성공');
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onAddReview = () => {
		const formData = setReviewFormData({
			reviewContent,
			reviewRating,
			reservationNumber,
			roomNumber,
			accomNumber,
			file,
		});
		if (formData === 'false') {
			return;
		} else {
			mutate(formData);
		}
		dispatch(closeModal());
	};

	// 포토리뷰 체크박스
	const onPhotoCheck = () => {
		const isCheck = !appendImg;
		setAppendImg(isCheck);
	};

	console.log('변환했니?222', typeof img);
	console.log('파일이 왜 없니???', file);

	return (
		<ReviewWrapper>
			<p>📝 나의 후기</p>
			<FormContainer>
				<RateBox>
					<Rating rate={reviewRating} setRate={setReviewRating} />
				</RateBox>
				<ReviewTextarea onChange={onCharacters} placeholder={`후기를 작성해주세요\n( 최대 250자 )`} rows={3} value={reviewContent} maxLength={250} />
				{overReview ? <OverTextWarning>※ 최대 글자수 250자를 초과하였습니다.</OverTextWarning> : <></>}
				<PhotoReviewBox>
					📷 포토리뷰
					<PhotoReviewBoxInput type="checkbox" onClick={onPhotoCheck}></PhotoReviewBoxInput>
				</PhotoReviewBox>
				<ReviewImageContainer>
					{appendImg ? (
						<ImageUploader width={width} height={height} setImage={setImg} setImgFile={onAddImgFile}>
							{img ? (
								<>
									<PreviewBox width={width} height={height} src={img.toString()} alt="이미지 미리보기" />
									<SmallIndicatorText>이미지 클릭시 교체</SmallIndicatorText>
								</>
							) : (
								<AddPhoto>
									+<PhotoBox src={photo} alt="이미지 올리기"></PhotoBox>
								</AddPhoto>
							)}
						</ImageUploader>
					) : (
						<></>
					)}
				</ReviewImageContainer>
				{reviewRating && reviewContent ? <Enroll onClick={onAddReview}>등록</Enroll> : <NonEnroll disabled>불가</NonEnroll>}
			</FormContainer>
		</ReviewWrapper>
	);
};

export default ReviewWrite;

const ReviewWrapper = styled.div`
	margin: 1.5rem 0 1rem 0;

	p {
		text-align: center;
		font-weight: bold;
		padding-bottom: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}
`;

const FormContainer = styled.div`
	display: grid;
	grid-template-columns: 4fr 1fr 1fr;

	@media (max-width: 320px) {
		grid-template-columns: 3fr 1fr 1fr;
	}
`;

const RateBox = styled.div`
	width: 75%;
	font-size: 1rem;
	line-height: 1rem;
	margin-bottom: 0.3rem;

	@media (max-width: 320px) {
		font-size: 0.5rem;
		ul {
			margin-right: -15vw;
			font-size: 0.7rem;
		}
	}
`;

const AddPhoto = styled.div`
	display: grid;
	align-self: center;
	margin: 0.3rem;
	padding: 0.5rem;
	background-color: ${color.color5};
	border-radius: 5rem;
	cursor: pointer;
	color: ${color.color1};
	font-weight: bold;
`;

const PhotoBox = styled.img`
	grid-column-start: 2;
	grid-column-end: 3;
	align-self: center;
	width: 1.5rem;
`;

const ReviewTextarea = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	align-self: center;
	margin-bottom: 0.5rem;

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

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const PreviewBox = styled.img`
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.5rem;
	width: 100%;
	height: 40%;
`;

const ReviewImageContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 4;
	grid-row-end: 5;

	@media (max-width: 370px) {
		grid-row-start: 5;
		grid-row-end: 6;
	}
`;

const PhotoReviewBox = styled.div`
	grid-column-start: 2;
	grid-column-end: 4;
	grid-row-start: 3;
	grid-row-end: 4;
	display: flex;
	justify-content: flex-end;
	font-weight: bold;
	margin-bottom: 0.5rem;

	@media (max-width: 370px) {
		grid-column-start: 1;
		grid-column-end: 4;
		grid-row-start: 4;
		grid-row-end: 5;
		justify-content: center;
	}
`;

const PhotoReviewBoxInput = styled.input`
	accent-color: ${color.color1};
`;

const Enroll = styled.button`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 3;
	justify-self: flex-end;
	margin-bottom: 0.5rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	border: none;
	border-radius: 0.5rem;
	border-color: ${color.color1};
	font-size: 1rem;
	cursor: pointer;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const NonEnroll = styled.button`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 3;
	justify-self: flex-end;
	margin-bottom: 0.5rem;
	background-color: ${color.lightGrayColor};
	color: ${color.darkGrayColor};
	border: none;
	border-radius: 0.5rem;
	border-color: ${color.lightGrayColor};
	font-size: 1rem;
	cursor: not-allowed;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const OverTextWarning = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 3;
	grid-row-end: 4;
	align-self: center;
	color: ${color.red};
	opacity: 0.8;
	text-align: left;
	font-size: 0.3rem;
	margin-bottom: 0.5rem;

	@media (max-width: 370px) {
		grid-column-start: 1;
		grid-column-end: 4;
	}
`;
