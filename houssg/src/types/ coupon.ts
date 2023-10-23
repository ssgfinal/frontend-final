interface CouponType {
	couponNumber: string;
	couponName: string;
	discount: number;
}

interface MainCoupon {
	couponNumber: string;
	couponName: string;
	discount: number;
	expirationDate: string;
	expirationStatus: number;
}

export type { CouponType, MainCoupon };
