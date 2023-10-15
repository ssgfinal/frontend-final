import { CouponType } from '.';

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

// 날짜별 예약 가능한 방 개수
interface BookableRoomCnt {
	date: string;
	availableRooms: number;
}

// 유저가 선택한 정보 == 백에 보낼 데이터
interface SelectedReservationType {
	roomId: number;
	selectedReservationDate?: string;
	night: number;
	visitorName: string;
	visitorPhone: string;
	usingCoupon: CouponType; // 프론트에서 선택한 쿠폰 한개
	usingPoint: number;
	paymentPrice: number;
}
export type { ReservationDetailType, ReservationsType, BookableRoomCnt, SelectedReservationType };
