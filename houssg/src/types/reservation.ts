interface ReservationDetailType {
	reservationNumber: number; // 예약번호
	paymentDate: string; // 결제일
	guestName: string; // 이용자명
	guestPhone: string; // 이용자핸드폰
	couponName: string; // 쿠폰이름
	couponNumber: string; // 쿠폰번호
	isUsed: number; // 쿠폰사용여부
	couponDiscount: number; // 쿠폰할인가
	pointDiscount: number; // 포인트사용
	payment: number; // 결제금액
}

interface MyReservation {
	reservationNumber: number;
	reservationTime: string;
	id: string;
	startDate: string;
	endDate: string;
	status: number;
	nickname: string;
	phoneNumber: string;
	guestName: string;
	guestPhone: string;
	accomNumber: string;
	accomName: string;
	roomNumber: string;
	roomCategory: string;
	roomPrice: number;
	couponNumber: string;
	couponName: string;
	discount: number;
	usePoint: number;
	totalPrice: number;
	paymentAmount: number;
	reviewStatus: number;
}

interface ReservationsType extends ReservationDetailType {
	userId: string;
	outdoorView: string; // 숙소이미지
	reservationStatus: number; // 예약상태
	reservationStartDate: string; // 예약시작날짜
	reservationEndDate: string; // 예약종료날짜
	accomName: string; // 숙소명
	roomCategory: string; // 객실 종류
	roomPrice: number; // 객실 가격
	reviewNumber: number; // 리뷰번호
}

export type { ReservationDetailType, ReservationsType, MyReservation };
