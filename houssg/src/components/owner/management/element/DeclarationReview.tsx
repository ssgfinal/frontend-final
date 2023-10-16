import styled from 'styled-components';
import { useRef } from 'react';
import { color } from '../../../../assets/styles';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { closeModal, modalText } from '../../../../store/redux/modalSlice';
import { ownerKey } from '../../../../assets/constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportReview } from '../../../../helper';

const DeclarationReview = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const declarationOption = useRef<HTMLSelectElement | null>(null);
	const modalData = useAppSelector(modalText);
	const houseAndReview = modalData.split('/&&');
	const houseId = parseInt(houseAndReview[0]);
	const reviewId = parseInt(houseAndReview[1]);

	const { mutate } = useMutation({
		mutationFn: (declarationReason: string) => reportReview(reviewId, declarationReason),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ownerKey.houseReview, houseId] });
			alert('신고 완료');
			dispatch(closeModal());
		},
		onError: () => {
			alert('실패 하였습니다.');
		},
	});

	const onDeclaration = () => {
		const declarationReason = declarationOption.current?.value;
		declarationReason && mutate(declarationReason);
	};

	return (
		<DeclarationReviewWrapper>
			<Warning>🚨후기를 신고하시겠습니까?🚨</Warning>
			<Discretion>※후기 신고는 신중하게 하시기 바랍니다.※</Discretion>
			<Reason>사유선택</Reason>
			<ReasonSelect ref={declarationOption}>
				<option>스팸홍보/도배글입니다.</option>
				<option>음란물입니다.</option>
				<option>불법정보를 포함하고있습니다.</option>
				<option>청소년에게 유해한 내용입니다.</option>
				<option>욕설/생명경시/혐오/차별적 표현입니다.</option>
				<option>개인정보 노출 게시물입니다.</option>
				<option>불쾌한 표현이 있습니다.</option>
				<option>명예훼손 또는 저작권이 침해되었습니다.</option>
				<option>불법촬영물등이 포함되어 있습니다.</option>
			</ReasonSelect>
			<DeclarationButton onClick={onDeclaration}>신고하기</DeclarationButton>
		</DeclarationReviewWrapper>
	);
};

export default DeclarationReview;

const DeclarationReviewWrapper = styled.div`
	margin: 2rem 0 2rem 0;
	display: grid;
`;

const Warning = styled.div`
	text-align: center;
	font-size: 1.3rem;
	font-weight: bold;

	@media (max-width: 400px) {
		font-size: 1.2rem;
	}

	@media (max-width: 320px) {
		font-size: 0.8rem;
	}
`;

const Discretion = styled.p`
	margin: 0.5rem 0 0.5rem 0;
	font-size: 0.8rem;
	text-align: center;
	color: ${color.darkGrayColor};

	@media (max-width: 400px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const Reason = styled.p`
	margin: 0.5rem 0 0.5rem 0;
	font-size: 1rem;
	font-weight: bold;
	@media (max-width: 320px) {
		font-size: 0.3rem;
	}
`;

const ReasonSelect = styled.select`
	cursor: pointer;
	outline: none;
	font-size: 1rem;
	padding: 0.4rem 0 0.4rem 0;
	margin: 0.5rem 0 2rem 0;
	border-radius: 0.5rem;

	option {
		color: ${color.darkGrayColor};
	}

	@media (max-width: 320px) {
		font-size: 0.3rem;
	}
`;

const DeclarationButton = styled.button`
	cursor: pointer;
	border: 2px solid ${color.red};
	border-radius: 0.3rem;
	font-size: 1.5rem;
	font-weight: bold;
	color: ${color.backColor};
	background-color: ${color.red};

	@media (max-width: 320px) {
		font-size: 1rem;
	}
`;
