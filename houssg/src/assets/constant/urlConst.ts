const authUrl = {
	// auth
	login: 'user/login',
	logout: 'user/logout',
	signUp: 'user/sign-up',
	idCheck: 'user/idcheck',
	nickCheck: 'user/nickname-check',
	findId: 'user/findid',
	findPw: 'user/findpw',
	updatePw: 'user/updatepassword',
	phoneCheck: 'sms/signup',
	phoneAuthCheck: 'sms/check',
	findIdCheck: 'sms/check-findid',
	//TODO:
	kakaoLogin: 'user/kakao',
	kakaoAdd: 'user/kakaAdd',
	//
};

const ownerUrl = {
	houseRegister: 'accom/add',
	myHouseList: 'accom/get',
};
export { authUrl, ownerUrl };
