// import { useParams } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { styled } from 'styled-components';

import Rating from '../common/Rating';
import { color } from '../../assets/styles';
import { Review } from './Review';
import { accomodation } from '../../assets/icons';

export const HouseReview = () => {
	// const { houseId } = useParams();

	const [activeReview, setActiveReview] = useState('');
	console.log('적힌 글자 > ' + activeReview);
	const [activeRate, setActiveRate] = useState<number>(0);
	const [overReview, setOverReview] = useState(false);

	const reviews = [
		{
			id: 1,
			writedate: '2023-12-34',
			writer: '니가 알아서 머할라고',
			roomtype: 'family',
			rate: 3.1,
			content: `ㅁㄷ럼;재댜럼재ㅑㄷ러매ㅑㄷㅈ러;맺댜럼;ㅐ쟈덞;ㅐㅈ댜ㅓㄻ;ㅐㅈ댜러;ㅁ재댜러\nㅐㅁ냐덞;ㅐㅈ댜ㅓㄹ;매쟈덞;재댜럼;재댜러\nㅁ니ㅣ아러;매쟏ㄻ;ㅐ쟏러;맺댜럼;재댜러\nㅁ;ㅈ대러ㅑ;ㅁ재댜러;매쟏러;맺댜러\nㅁ;ㅐㅈ댜럼;재댜럼;ㅐㅈ댜ㅓㄹ;ㅁ잳랴ㅓㅁ;ㅈ대랴ㅓㅁ;ㅐㅈ댤더ㅐ\n맺덜;매쟏러;ㅁ재댜럼;재댜러;매쟈ㅓㄷㄹ;맺댜러\nㅁ;재ㅐㄷㄹ더ㅐㅑㅁ;잳랴ㅓㅁ;잳러ㅑ;맺댜러;ㅁ재댜러\n;ㅐㅈ댜`,
			img: accomodation,
		},
		{ id: 2, writedate: '2023-12-34', writer: '눕고싶다', roomtype: 'standard', rate: 3.5, content: '리뷰만 지금 2번째 \n진빠진다\n정말\n웩' },
		{
			id: 3,
			writedate: '2023-12-34',
			writer: '지붕만있다면거기가집',
			roomtype: 'twin',
			rate: 3.7,
			content: '아무말 대잔치\n주리님\n오늘따라\n침대가 그리워요',
			img: accomodation,
		},
	];

	const handleWriteReview = (text: string) => {
		if (text.length > 250) {
			setOverReview(true);
		} else {
			setOverReview(false);
			setActiveReview(text);
		}
	};
	const submit = (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('review', activeReview);
		const formElement = e.target as HTMLFormElement;

		if (formElement.uploadFile.files.length > 0) {
			formData.append('uploadFile', formElement.uploadFile.files[0]);
		}
	};
	return (
		<Wrapper>
			<InputBox>
				{/* 하우스 번호 : {houseId}{' '} */}
				<RateBox>
					<Rating rate={activeRate} setRate={setActiveRate} />
				</RateBox>
				<form name="frm" onSubmit={submit} encType="multipart/form-data">
					<Input>
						<Textarea placeholder={`후기를 작성해주세요\n( 최대 250자 )`} onChange={(e) => handleWriteReview(e.target.value)} value={activeReview} />
						<AddPhoto>
							<FileInput type="file" name="uploadFile" />
							<Text> + 사진</Text>
						</AddPhoto>
						<Enroll type="submit" value="등록" />
					</Input>
					<OverTextWarning>{overReview ? <> ※ 최대 글자수 250자를 초과하였습니다.</> : <></>}</OverTextWarning>
				</form>
			</InputBox>
			<ReviewList>
				{reviews.map((review) => (
					<Review key={review.id} review={review} />
				))}
			</ReviewList>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem 0;
`;
const InputBox = styled.div`
	margin-bottom: 3rem;
`;

const RateBox = styled.div`
	width: 25%;
`;
const Input = styled.div`
	margin: 1rem 0;
	display: grid;
	grid-gap: 1rem;
	white-space: 'pre-wrap';

	@media (min-width: 1500px) {
		grid-template-columns: 8fr 1fr 1.5fr;
	}
	@media (min-width: 750px) and (max-width: 1500px) {
		grid-template-columns: 3fr 1fr 1fr;
	}
	@media (max-width: 750px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const Textarea = styled.textarea`
	padding: 0.5rem;
	border-color: ${color.color1};
	border-radius: 0.5rem;
	resize: none;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${color.color1};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 0.5rem;
		box-shadow: inset 0px 0px 5px white;
	}
	@media (max-width: 750px) {
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;

const AddPhoto = styled.label`
	padding: 1rem 1rem;
	display: grid;
	@media (min-width: 750px) {
		grid-template-columns: 8fr 1fr 1.5fr;
	}
	grid-template-rows: 14fr 1fr;
	background-color: ${color.color1};
	color: white;
	border: none;
	border-radius: 1rem;
	cursor: pointer;
`;

const FileInput = styled.input`
	display: none;
`;

const Text = styled.div`
	align-self: center;
	text-align: center;
`;

const Enroll = styled.input`
	background-color: ${color.color1};
	color: white;
	border: solid;
	border-radius: 1rem;
	border-color: ${color.color1};
	font-size: 1rem;
	cursor: pointer;
`;

const OverTextWarning = styled.div`
	color: red;
	opacity: 0.8;
	text-align: left;
	font-size: small;
`;
const ReviewList = styled.div`
	white-space: pre-wrap;
`;
