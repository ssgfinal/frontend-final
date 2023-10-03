import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { color } from '../../assets/styles';
import Rating from '../common/Rating';
import { closeModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';
import { ImageUploader } from '../common';
import { SmallIndicatorText } from '../../assets/styles/StyledComponents';
import { cancel2, photo } from '../../assets/icons';
// import { cancel, cancel3 } from '../../assets/icons';
// TODO: 나중에 지우기 이미지 조심!!!build 안 됨

const ReviewWrite = () => {
	const [activeReview, setActiveReview] = useState('');
	const [activeRate, setActiveRate] = useState<number>(0);
	const [overReview, setOverReview] = useState(false);
	const [imgFile, setImgFile] = useState('');
	const width = '100%';
	const height = '40%';

	const dispatch = useAppDispatch();

	// TODO: 250자 초과 알림 useState로 하고 있어서 useRef 안 해도 될 듯??사업자 후기도 고쳐야 할 듯
	const onCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const activeReviewValue = e.target.value;

		if (activeReviewValue.length <= 250) {
			setOverReview(false);
			setActiveReview(activeReviewValue);
		} else {
			setOverReview(true);
		}
	};

	const submit = (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData();

		//TODO: 별점 DB에서는 string?, number? FormEvent에서는 number가 안 되는지..?, 콘솔지우기
		formData.append('rate', activeRate.toString());
		console.log(activeRate);

		// 후기 TODO: 콘솔 지우기
		formData.append('review', activeReview);
		console.log(activeReview);

		// 사진 TODO: 콘솔 지우기
		if (imgFile) {
			const baseImg = imgFile?.toString() as string;
			formData.append('uploadFile', baseImg);
			console.log('이미지가 있을 때 base64 ===> ' + typeof baseImg);
			console.log('이미지가 있을 때 base64 ===> ' + baseImg);

			dispatch(closeModal());
		} else {
			setImgFile('');
			console.log('이미지가 없을 때 null ===> ' + imgFile);
			dispatch(closeModal());
		}
	};

	const onReset = () => {
		// TODO: 올린 사진 삭제 후에 다시 파일 선택창이 뜸ㅠㅠ
		setImgFile('');
	};

	return (
		<ReviewWrapper>
			<p>📝 나의 후기</p>
			<FormContainer name="frm" onSubmit={submit} encType="multipart/form-data">
				<RateBox>
					<Rating rate={activeRate} setRate={setActiveRate} />
				</RateBox>
				<ReviewTextarea placeholder={`후기를 작성해주세요\n( 최대 250자 )`} rows={3} onChange={onCharacters} maxLength={250} value={activeReview} />
				<OverTextWarning>{overReview ? <> ※ 최대 글자수 250자를 초과하였습니다.</> : <></>}</OverTextWarning>
				<ReviewImageContainer>
					<ImageUploader width={width} height={height} setImage={setImgFile}>
						{imgFile ? (
							<>
								{/* TODO: 취소이미지 뭐가 좋은지 cancel, cancel2, cancel3 중 */}
								<PreviewPosition>
									<ResetButton onClick={onReset}>
										<img src={cancel2} alt="이미지 삭제"></img>
									</ResetButton>
									<PreviewBox width={width} height={height} src={imgFile.toString()} alt="이미지 미리보기" />
								</PreviewPosition>
								<SmallIndicatorText>이미지 클릭시 교체</SmallIndicatorText>
							</>
						) : (
							// TODO: htmlFor 없어도 작동은 되는데...할지말지 label의 for과 같음
							<AddPhoto htmlFor="file">
								<span>+</span>
								<PhotoBox src={photo} alt="이미지 올리기"></PhotoBox>
							</AddPhoto>
						)}
					</ImageUploader>
				</ReviewImageContainer>
				<Enroll type="submit" value="등록" />
			</FormContainer>
		</ReviewWrapper>
	);
};

export default ReviewWrite;

const ReviewWrapper = styled.div`
	margin: 2rem 0 1rem 0;

	p {
		font-weight: bold;
		@media (max-width: 900px) {
			font-size: 0.8rem;
		}

		@media (max-width: 430px) {
			font-size: 0.5rem;
		}
	}
`;

const FormContainer = styled.form`
	display: grid;
	grid-template-columns: 5fr 1fr;

	@media (max-width: 320px) {
		grid-template-columns: 3fr 1fr;
	}
`;

const RateBox = styled.div`
	width: 75%;
	font-size: 1rem;
	line-height: 1rem;

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

const ResetButton = styled.button`
	position: absolute;
	z-index: 2;
	top: 4%;
	right: 1%;
	border: none;
	background-color: transparent;
	transition: all ease 0.1s;
	/* TODO: 효과 뭐가 좋을지 */
	/* transition: all 0.2s linear; */

	img {
		cursor: pointer;
		width: 1.5rem;
	}

	&:hover {
		transform: rotate(45deg);
		/* transform: rotateY(180deg); */
	}
`;

const AddPhoto = styled.label`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 5;
	grid-row-end: 6;
	display: grid;
	align-self: center;
	margin: 0.3rem;
	padding: 0.5rem;
	background-color: ${color.color5};
	border-radius: 5rem;
	cursor: pointer;

	span {
		color: ${color.color1};
		font-weight: bold;
		grid-column-start: 1;
		grid-column-end: 2;
	}
`;

const PhotoBox = styled.img`
	grid-column-start: 2;
	grid-column-end: 3;
	align-self: center;
	width: 1.5rem;
`;

const ReviewTextarea = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 4;
	align-self: center;
	margin: 0.3rem 0;
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

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const PreviewBox = styled.img`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 5;
	grid-row-end: 6;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.5rem;
	width: 100%;
	height: 40%;
`;

const ReviewImageContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 5;
	grid-row-end: 6;
`;

const PreviewPosition = styled.div`
	position: relative;
`;

const Enroll = styled.input`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 4;
	margin: 0.5rem;
	padding: 0.5rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	border: solid;
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

const OverTextWarning = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 4;
	grid-row-end: 5;
	color: ${color.red};
	opacity: 0.8;
	text-align: left;
	font-size: small;
	padding-bottom: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;
