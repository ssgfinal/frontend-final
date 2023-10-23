const userUrl = {
	// TODO: 백 mypage 관련 URL 나오면 수정 & 페이지별 구분?기능별구분?
	//main
	ratingOrder: 'accom/20/score',
	registrationOrder: 'accom/20/date',

	// deleteLike: 'favorite',
	// mypage
	mypage: 'mypage/all',
	updateNick: 'nick/update',
	updatePhone: 'phone/update', // TODO: 폰 번호 수정!!새로운 번호 전달
	phoneCheck: 'sms/change-phone', // 번호 중복확인
	phoneAuthCheck: 'sms/check', // 인증번호 검사
	updateMyPw: 'pw/update',
	myCoupon: 'coupon/mypage',
	enrollCoupon: 'coupon/enroll-usercoupon',
	withdrawal: 'user/withdrawal',
	myReview: 'mypage/review',
	myFavorite: 'mypage/favorite',

	// userhouselist
	houseList: 'search',

	// reservation 예약내역페이지
	review: 'reveiw',
	addReview: 'review/add', // 유저가 등록하는 리뷰
	myReservation: 'reservation/history',
	preview: 'reservation/review',
	// UserHouseDetail
	houseDetail: 'accom/detail',
	like: 'favorite',
	reviewList: 'review/all/accom',

	// UserReservation.tsx 예약하기 페이지
	reservation: 'reservation/basic-info', // 에약하기 페이지에서 띄울 데이터 요청하는 url
	reservationEnroll: 'reservation/enroll', // 예약하기
	isPaymentSuccess: 'reservation/check-complete', // 결제 성공 여부
};

const authUrl = {
	// auth
	login: 'user/log-in',
	logout: 'user/log-out',
	signUp: 'user/sign-up',
	idCheck: 'user/id-check',
	nickCheck: 'user/nickname-check',
	findId: 'user/find-id',
	findPw: 'user/find-pw',
	updatePw: 'user/update-pw',
	phoneCheck: 'sms/sign-up',
	phoneAuthCheck: 'sms/check',
	findIdCheck: 'sms/check-findid',
	//TODO:
	kakaoLogin: 'user/kakao/log-in',
	kakaoAdd: 'user/kakao/sign-up',
	//
};

const ownerUrl = {
	houseRegister: 'accom/add',
	myHouseList: 'mypage/accom',
	houseEdit: 'accom',
	checkBusinessNumber: 'naverOcr',

	houseReview: 'review/all/accom',
	addComment: 'review/comment/add',
	reportReview: 'review/report',
	patchComment: 'review/comment',
	//예약
	checkReservation: 'reservation/owner/check',
	getReservation: 'reservation/owner/check-other',
	getRoomAvailability: 'reservation/owner/available-room',
	offlineReservation: 'reservation/owner/offline',
	cancelReservation: 'reservation/owner-cancel',
	roomReservableDay: 'reservation/owner-modal',
	//삭제요청
	houseDeleteRequest: 'accom/del/request',
	roomDelete: 'room',
};

const roomUrl = {
	roomList: 'room/detail',
	roomAdd: 'room/add',
	roomEdit: 'room',
};

export { userUrl, authUrl, ownerUrl, roomUrl };
