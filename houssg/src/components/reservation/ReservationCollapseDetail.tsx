import React from 'react';
import { styled } from 'styled-components';

interface CollapseDetail {
	detail: {
		userId: string;
		reservationNumber: number;
		guestName: string;
		guestPhone: string;
		couponNumber: number;
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
			<p>삭제예정-예약번호 : {detail.reservationNumber}</p>
			<p>이용자명 : {detail.guestName} 님</p>
			<p>전화번호 : {detail.guestPhone}</p>
			<p>
				쿠폰번호 : {detail.couponName} ({detail.couponNumber})
			</p>
			<p>쿠폰할인 : {detail.couponDiscount}원</p>
			<p>포인트사용내역 : {detail.pointDiscount}p</p>
			<p>결제금액 : {detail.payment}</p>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	width: 100%;
`;
