import { CouponType } from '.';

interface ReservationDetailType {
	reservationNumber: number; // 예약번호
	reservationTime: string; // 결제일
	guestName: string; // 이용자명
	guestPhone: string; // 이용자핸드폰
	couponName: string; // 쿠폰이름
	couponNumber: string; // 쿠폰번호
	// isUsed: number; // 쿠폰사용여부 // 백에선 안 주는 듯
	discount: number; // 쿠폰할인가
	usePoint: number; // 포인트사용
	paymentAmount: number; // 결제금액
}

interface ReservationsType extends ReservationDetailType {
	accomName: string; // 숙소명
	accomNumber: number; //프론트서 안 쓰는 듯
	img: string; // 숙소이미지 // 현재 백에서 안 보냄 , 말해놨음
	status: number; // 예약상태
	startDate: string; // 예약시작날짜
	endDate: string; // 예약종료날짜
	roomNumber: number; //프론트서 안 씀
	roomCategory: string; // 객실 종류
	roomPrice: number; // 객실 가격
	totalPrice: number; // 할인 전 원가 // 프론트 안 쓰는 듯
	reviewStatus: number; // 리뷰 여부 // 프론트에서 안 쓰는 듯
	reviewNumber?: number; // 리뷰번호 // 백에서 안 줌, 예약 내역에서 리스펀스로 안 주고 예약 번호를 날리면 리뷰 주겠데(보근님)
}

// 날짜별 예약 가능한 방 개수
interface BookableRoomCnt {
	date: string;
	availableRooms: number;
}

// 달력 이벤트
interface Schedule {
	title: string;
	date: string;
	allDay: boolean;
}

// 유저가 선택한 정보 == 백에 보낼 데이터
interface SelectedReservationType {
	roomId: number;
	selectedReservationDate?: string;
	startDate: string;
	endDate: string;
	night: number;
	visitorName: string;
	visitorPhone: string;
	usingCoupon: CouponType; // 프론트에서 선택한 쿠폰 한개
	usingPoint: number;
	paymentPrice: number;
}
export type { ReservationDetailType, ReservationsType, BookableRoomCnt, Schedule, SelectedReservationType };
