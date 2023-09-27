import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { color } from '../../assets/styles';
import Rating from '../common/Rating';

const ReviewWrite = () => {
	const [activeReview, setActiveReview] = useState('');
	console.log('적힌 글자 > ' + activeReview);
	const [activeRate, setActiveRate] = useState<number>(0);
	const [overReview, setOverReview] = useState(false);

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
		<div>
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
		</div>
	);
};

export default ReviewWrite;

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
