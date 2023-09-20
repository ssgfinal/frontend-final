import React from 'react';
import { styled } from 'styled-components';

interface CollapseDetail {
	detail: {
		userId: string;
		reservationNumber: number;
		guestName: string;
		guestPhone: string;
		couponName: string;
		isUsed: number;
		couponDiscount: number;
		pointDiscount: number;
		payment: number;
	};
}

const ReservationCollapseDetail: React.FC<CollapseDetail> = ({ detail }) => {
	return (
		<CollapseDetailWrapper>
			{/* TODO : 기능구현할 때, 수정 */}
			<p>이용자명 : {detail.guestName} 님</p>
			<p>전화번호 : {detail.guestPhone}</p>
			{/* TODO : 쿠폰 미사용시 안 보이게 삼항 */}
			<p>사용쿠폰 : {detail.couponName}</p>
			<p>쿠폰할인 : {detail.couponDiscount.toLocaleString()}원</p>
			<p>포인트사용 : {detail.pointDiscount.toLocaleString()}p</p>
			<p>결제금액 : {detail.payment.toLocaleString()}</p>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	width: 100%;
`;
