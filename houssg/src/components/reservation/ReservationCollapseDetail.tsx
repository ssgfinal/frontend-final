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
				<BottomMargin>• 이용자명 : {detail.guestName} 님</BottomMargin>
				<BottomMargin>• 전화번호 : {detail.guestPhone}</BottomMargin>
			</CollapseDetailContainer>
			<PaymentContainer>
				<PaymentDateBox>{formatDate(detail.reservationTime)}</PaymentDateBox>
				{/* TODO: 쿠폰 미사용시 안 보이게 삼항 */}
				{detail.couponNumber ? (
					<>
						<BottomMargin>
							사용 쿠폰 : {detail.couponName}({detail.couponNumber})
						</BottomMargin>
						<BottomMargin>쿠폰 할인 : {detail.discount.toLocaleString()}원</BottomMargin>
					</>
				) : (
					<>
						<BottomMargin>사용 쿠폰 : 사용 안함</BottomMargin>
						<BottomMargin>쿠폰 할인 : 0원</BottomMargin>
					</>
				)}
				{detail.usePoint ? (
					<BottomMargin>포인트사용 : {detail.usePoint.toLocaleString()}p</BottomMargin>
				) : (
					<BottomMargin>포인트 사용 : 0p</BottomMargin>
				)}

				<BottomMargin>결제 금액 : {detail.paymentAmount.toLocaleString()}원</BottomMargin>
			</PaymentContainer>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	width: 100%;
`;

const BottomMargin = styled.p`
	padding-bottom: 0.6rem;
`;
const PaymentDateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 2;
	/* border-bottom: 1px solid ${color.darkGrayColor}; */
	font-weight: bold;
	padding-bottom: 0.6rem;
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
