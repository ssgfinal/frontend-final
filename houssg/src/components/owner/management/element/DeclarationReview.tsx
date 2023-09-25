import styled from 'styled-components';
import { color } from '../../../../assets/styles';

const DeclarationReview = () => {
	return (
		<DeclarationReviewWrapper>
			<Warning>🚨후기를 신고하시겠습니까?🚨</Warning>
			<Discretion>※ 후기 신고는 신중하게 결정하여 주시기 바랍니다.</Discretion>
			<Reason>사유선택</Reason>
			<ReasonSelect>
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
			<DeclarationButton>신고하기</DeclarationButton>
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
	color: ${color.basicColor};
	background-color: rgb(248, 190, 0);
	border-top: 8px solid ${color.basicColor};
	border-bottom: 8px solid ${color.basicColor};
`;

const Discretion = styled.p`
	margin: 0.5rem 0 0.5rem 0;
	font-size: 0.8rem;
	color: ${color.darkGrayColor};
`;

const Reason = styled.p`
	margin: 0.5rem 0 0.5rem 0;
	font-size: 1rem;
	font-weight: bold;
`;

const ReasonSelect = styled.select`
	cursor: pointer;
	outline: none;
	font-size: 1rem;
	padding: 0.4rem;
	margin: 0.5rem;
	border-radius: 0.5rem;

	option {
		color: ${color.darkGrayColor};
	}
`;

const DeclarationButton = styled.button`
	cursor: pointer;
	border: none;
	border-radius: 0.3rem;
	font-size: 1.5rem;
	font-weight: bold;
	background-color: orangered;
	color: whitesmoke;
`;
