interface MyCouponList {
	couponNumber: string;
	couponName: string;
	discount: number;
	expirationDate: string;
	expirationStatus: number;
}

interface MyReviews {
	reviewNumber: number;
	content: string;
	rating: number;
	reviewDate: string;
	commentContent: string | null;
	commentDate: string | null;
	managerId: string;
	reportStatus: number;
	reservationNumber: number;
	roomNumber: number;
	accomNumber: number;
	reviewImage: string | null;
	roomType: string;
	houseId: number;
	accomName: string;
}

export type { MyCouponList, MyReviews };
