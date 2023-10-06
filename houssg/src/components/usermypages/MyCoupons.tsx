import styled from 'styled-components';
import { color } from '../../assets/styles';
import hourClock from '../../utils/hourClock';

interface CouponList {
	coupons: {
		userId: string;
		couponNumber: string;
		couponName: string;
		isUsed: number;
		couponDiscount: number;
		expitationDate: string;
	};
}

const MyCoupons: React.FC<CouponList> = ({ coupons }) => {
	return (
		<div>
			<CouponsWrapper>
				<p>{coupons.couponName}</p>
				<p>{coupons.couponDiscount.toLocaleString()}원</p>
				<p>유효기간 : ~ {hourClock(coupons.expitationDate)}</p>
			</CouponsWrapper>
		</div>
	);
};

export default MyCoupons;

const CouponsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;

	justify-content: space-between;
	align-content: space-between;
	margin-bottom: 1vw;
	padding-bottom: 1vw;
	border-bottom: 1px dotted ${color.unSelectColor};

	:nth-child(1) {
		font-weight: bold;
		font-size: 0.9rem;
		width: 50%;

		@media (max-width: 430px) {
			font-size: 0.8rem;
		}
	}
	:nth-child(2) {
		font-weight: bold;
		font-size: 0.9rem;
		text-align: end;
		width: 50%;

		@media (max-width: 430px) {
			font-size: 0.8rem;
		}
	}
	:nth-child(3) {
		line-height: 1.3rem;
		font-size: 0.8rem;

		@media (max-width: 430px) {
			font-size: 0.5rem;
		}
	}
`;
