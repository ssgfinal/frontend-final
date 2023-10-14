interface MyCouponList {
	couponNumber: string;
	couponName: string;
	discount: number;
	expirationDate: string;
	expirationStatus: number;
}

interface EnrollCouponList {
	id: string;
	couponNumber: string;
	couponName: string;
	discount: number;
	expirationDate: string;
	isUsed: number;
}

interface MyReviewList {
	reviewNumber: number;
	reviewContent: string;
	reviewRating: number;
	reviewCreationTime: string;
	reviewComment: string | null;
	reviewCommentTime: string | null;
	managerId: string;
	reportStatus: number;
	reservationNumber: number;
	roomNumber: number;
	accomNumber: number;
	img: string | null;
	roomCategory: string;
	accomName: string;
	nickname: string;
}

export type { MyCouponList, EnrollCouponList, MyReviewList };
