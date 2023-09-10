import styled from 'styled-components';
import { color } from '../../assets/styles';

interface CouponList {
	coupons: {
		userId: string;
		couponNumber: number;
		couponName: string;
		isUsed: number;
		couponDiscount: number;
	};
}

const MyCoupons: React.FC<CouponList> = ({ coupons }) => {
	return (
		<div>
			<CouponsWrapper>
				{coupons.couponName} / {coupons.couponDiscount.toLocaleString()}원
			</CouponsWrapper>
		</div>
	);
};

export default MyCoupons;

const CouponsWrapper = styled.div`
	margin-bottom: 1vw;
	padding-bottom: 1vw;
	border-bottom: 1px dotted ${color.unSelectColor};
`;
