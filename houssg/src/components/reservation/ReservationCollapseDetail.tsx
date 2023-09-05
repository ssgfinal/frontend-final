import React from 'react';
import { styled } from 'styled-components';

interface CollapseDetail {
	detail: {
		user_id: string;
		reservation_number: number;
		guest_name: string;
		guest_phone: string;
		coupon_number: number;
		coupon_name: string;
		is_used: number;
		discount: number;
		// TODO : 포인트는 어디에??
	};
}

const ReservationCollapseDetail: React.FC<CollapseDetail> = ({ detail }) => {
	return (
		<CollapseDetailWrapper>
			{/* TODO : 기능구현할 때, 수정 */}
			<p>예약번호 : {detail.reservation_number}</p>
			<p>이용자명 : {detail.guest_name} 님</p>
			<p>전화번호 : {detail.guest_phone}</p>
			<p>
				쿠폰번호 : {detail.coupon_name} ({detail.coupon_number})
			</p>
			<p>할인내역 : {detail.discount}원</p>
			<p>포인트내역 : p</p>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	width: 100%;
`;
