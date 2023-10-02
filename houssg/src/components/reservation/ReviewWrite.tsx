import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { color } from '../../assets/styles';
import Rating from '../common/Rating';
import { closeModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';
import { ImageUploader } from '../common';
import { SmallIndicatorText } from '../../assets/styles/StyledComponents';
import { capture } from '../../assets/icons';

const ReviewWrite = () => {
	const [activeReview, setActiveReview] = useState('');
	const [activeRate, setActiveRate] = useState<number>(0);
	const [overReview, setOverReview] = useState(false);
	const [imgFile, setImgFile] = useState<string | ArrayBuffer | null>(null);
	const width = '300px';
	const height = '400px';

	const dispatch = useAppDispatch();

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
			setImgFile(null);
			console.log('이미지가 없을 때 null ===> ' + imgFile);
			dispatch(closeModal());
		}
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
								<PreviewBox width={width} height={height} src={imgFile.toString()} alt="이미지 미리보기" />
								<SmallIndicatorText>이미지 클릭시 교체</SmallIndicatorText>
							</>
						) : (
							<AddPhoto>
								<span>+&nbsp;</span>
								<PhotoBox src={capture}></PhotoBox>
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
	width: 100%;
	margin: 2rem 0 1rem 0;
`;

const FormContainer = styled.form`
	display: grid;
	grid-template-columns: 5fr 1fr;
`;

const RateBox = styled.div`
	width: 75%;
	font-size: 1rem;
	line-height: 1rem;
`;

const AddPhoto = styled.label`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 3;
	margin: 0.5rem;
	padding: 0.8rem;
	justify-self: center;
	align-self: center;
	background-color: ${color.color5};
	border-radius: 5rem;
	cursor: pointer;

	span {
		padding-bottom: 0.5rem;
		color: ${color.color1};
	}
`;

const PhotoBox = styled.img`
	width: 1rem;
`;

const ReviewTextarea = styled.textarea`
	grid-column-start: 1;
	grid-column-end: 3;
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

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const PreviewBox = styled.img`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 5;
	grid-row-end: 6;
	border: 1px solid ${color.darkGrayColor};
	border-radius: 0.5rem;
	width: 100%;
	height: 300px;
`;

const ReviewImageContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-row-start: 5;
	grid-row-end: 6;
`;

const Enroll = styled.input`
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 4;
	justify-self: center;
	align-self: center;
	margin: 0.5rem;
	padding: 0.5rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	border: solid;
	border-radius: 0.5rem;
	border-color: ${color.color1};
	font-size: 1rem;
	cursor: pointer;
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

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;
