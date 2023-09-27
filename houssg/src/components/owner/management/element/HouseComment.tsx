import { useState, useRef } from 'react';
import styled from 'styled-components';
import { color } from '../../../../assets/styles';
import { useAppDispatch } from '../../../../hooks';
import { closeModal } from '../../../../store/redux/modalSlice';

const HouseComment = () => {
	const commentContent = useRef<HTMLTextAreaElement | null>(null);
	const [activeReview, setActiveReview] = useState('');
	const [overReview, setOverReview] = useState(false);

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

	const onComment = () => {
		const commentValue = commentContent.current?.value;
		//TODO: 콘솔 지우기 지금은 errorㅠㅠ
		console.log(commentValue);
		dispatch(closeModal());
	};

	return (
		<CommentContainer>
			<NickName>💌 사장님 답글</NickName>
			<CommentTextarea
				placeholder={`답글을 작성해주세요.\n( 최대 250자 )`}
				rows={9}
				maxLength={250}
				ref={commentContent}
				onChange={onCharacters}
				value={activeReview}
			/>
			<OverTextWarning>{overReview ? <> ※ 최대 글자수 250자를 초과하였습니다.</> : <></>}</OverTextWarning>
			<CommentSubmitButton onClick={onComment}>등록하기</CommentSubmitButton>
		</CommentContainer>
	);
};

export default HouseComment;

const CommentContainer = styled.div`
	width: 100%;
	margin: 2rem 0 2rem 0;
	display: grid;
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
	font-size: 1rem;
	font-weight: bold;
	padding-bottom: 1rem;

	@media (max-width: 900px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const CommentTextarea = styled.textarea`
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

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;
