const userUrl = {
	// TODO: 백 mypage 관련 URL 나오면 수정 & 페이지별 구분?기능별구분?
	// mypage
	mypage: 'mypage/all',
	updateNick: 'mypage/update-nick',
	updatePhone: 'mypage/update-phone',
	updateMyPw: 'mypage/update-pw',
	myCoupon: 'coupon/enroll-usercoupon', // 유저가 쿠폰 등록?
	withdrawal: 'user/withdrawal',
	myReview: 'mypage/review', // 마이페이지 리뷰 목록?
	myFavorite: 'mypage/favorite', // 마이페이지 찜 목록?
	// reservation
	addReview: 'review/add', // 유저가 등록하는 리뷰?
	// favorite
	addFavorite: 'favorite/add', // 유저가 찜 하기?
	delFavorite: 'favorite', // 유저 찜 해제?
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
	kakaoLogin: 'user/kakao',
	kakaoAdd: 'user/kakaAdd',
	//
};

const ownerUrl = {
	houseRegister: 'accom/add',
	myHouseList: 'mypage/accom',
};
export { authUrl, ownerUrl, userUrl };
