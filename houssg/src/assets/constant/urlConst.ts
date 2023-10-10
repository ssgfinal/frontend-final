const userUrl = {
	ratingOrder: 'accom/20/score',
	registrationOrder: 'accom/20/date',
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
export { userUrl, authUrl, ownerUrl };
