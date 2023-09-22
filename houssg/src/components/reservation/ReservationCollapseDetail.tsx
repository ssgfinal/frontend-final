import React from 'react';
import { styled } from 'styled-components';
import { ReservationDetailType } from '../../types';
import { color } from '../../assets/styles';

interface CollapseDetail {
	detail: ReservationDetailType;
}

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	return new Date(dateString).toLocaleDateString(undefined, options);
};

const ReservationCollapseDetail: React.FC<CollapseDetail> = ({ detail }) => {
	return (
		<CollapseDetailWrapper>
			{/* TODO: 기능구현할 때, 수정 */}

			<CollapseDetailContainer>
				<p>• 이용자명 : {detail.guestName} 님</p>
				<p>• 전화번호 : {detail.guestPhone}</p>
			</CollapseDetailContainer>
			<PaymentContainer>
				<PaymentDateBox>{formatDate(detail.paymentDate)}</PaymentDateBox>
				{/* TODO: 쿠폰 미사용시 안 보이게 삼항 */}
				{detail.couponName ? (
					<p>
						사용쿠폰 : {detail.couponName}({detail.couponNumber})
					</p>
				) : (
					<p>사용쿠폰 : 사용안함</p>
				)}
				{detail.couponDiscount ? <p>쿠폰할인 : {detail.couponDiscount.toLocaleString()}원</p> : <p>쿠폰할인 : 0원</p>}
				{detail.pointDiscount ? <p>포인트사용 : {detail.pointDiscount.toLocaleString()}p</p> : <p>포인트사용 : 0p</p>}

				<p>결제금액 : {detail.payment.toLocaleString()}원</p>
			</PaymentContainer>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	width: 100%;
`;

const PaymentDateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 2;
	border-bottom: 1px solid ${color.darkGrayColor};
	font-weight: bold;
`;

const PaymentContainer = styled.div`
	color: ${color.darkGrayColor};
	padding: 1vw;
	background-color: ${color.lightGrayColor};
	border-radius: 0.3rem;
`;

const CollapseDetailContainer = styled.div`
	font-weight: bold;
`;
