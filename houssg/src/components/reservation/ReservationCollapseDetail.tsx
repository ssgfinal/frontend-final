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
			{/* <input type="hidden" value={detail.user_id} />
			<input type="hidden" value={detail.is_used} /> */}
			<p>예약번호: {detail.reservation_number}</p>
			<p>이용자명: {detail.guest_name}</p>
			<p>전화번호: {detail.guest_phone}</p>
			<p>
				쿠폰: {detail.coupon_name} ({detail.coupon_number})
			</p>
			<p>할인: {detail.discount}원</p>
			<p>포인트내역 어디?</p>
		</CollapseDetailWrapper>
	);
};

export default ReservationCollapseDetail;

const CollapseDetailWrapper = styled.div`
	background-color: red;
	@media (max-width: 360px) {
		width: 90vw;
	}

	@media (min-width: 360px) and (max-width: 540px) {
		width: 50vw;
	}

	@media (min-width: 540px) and (max-width: 768px) {
		width: 27vw;
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		width: 40vw;
	}

	@media (min-width: 1024px) and (max-width: 1700px) {
		width: 25vw;
	}

	@media (min-width: 1700px) {
		width: 20vw;
	}
`;
