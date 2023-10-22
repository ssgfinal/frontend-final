import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { MyCouponList } from '../../types';
import { userKey } from '../../assets/constant/queryKey';
import { getMyCouponList } from '../../helper';

import { color } from '../../assets/styles';

const MyCoupons = () => {
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MyCouponList[] }>([userKey.myCoupon], () => getMyCouponList(), {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		isSuccess && (
			<>
				{data.data?.map((coupon, i) => {
					if (coupon) {
						return (
							<div key={i}>
								{coupon.expirationStatus !== 1 ? (
									<CouponsWrapper>
										{coupon.expirationStatus}
										<p>{coupon.couponName}</p>
										<p>{coupon.discount.toLocaleString()}원</p>
										<p>유효기간 : ~ {coupon.expirationDate}</p>
									</CouponsWrapper>
								) : (
									<NullBox>등록된 쿠폰이 없습니다.</NullBox>
								)}
							</div>
						);
					}
					return null;
				})}
			</>
		)
	);
};

export default MyCoupons;

const CouponsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 1vw;
	padding-bottom: 1vw;
	border-bottom: 1px dotted ${color.unSelectColor};

	:nth-child(1) {
		padding: 1rem 0;
		font-weight: bold;
		font-size: 0.9rem;
		width: 65%;

		@media (max-width: 600px) {
			font-size: 0.8rem;
		}

		@media (max-width: 300px) {
			font-size: 0.5rem;
		}
	}
	:nth-child(2) {
		padding: 1rem 0;
		font-weight: bold;
		font-size: 0.9rem;
		text-align: end;
		width: 35%;

		@media (max-width: 600px) {
			font-size: 0.8rem;
		}

		@media (max-width: 300px) {
			font-size: 0.5rem;
		}
	}
	:nth-child(3) {
		padding: 1rem 0;
		line-height: 1.3rem;
		font-size: 0.8rem;

		@media (max-width: 600px) {
			font-size: 0.7rem;
		}

		@media (max-width: 300px) {
			font-size: 0.5rem;
		}
	}
`;

const NullBox = styled.div`
	text-align: center;
	margin: auto;
`;
