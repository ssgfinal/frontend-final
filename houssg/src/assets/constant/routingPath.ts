const userRoute = {
	main: '/',
	houseList: '/user/house',
	houseDetail: '/user/houseDetail/',
	myPage: '/user/mypage',
	reservationList: '/user/reservation',
	// reservation: '/user/reservation/',
	reservation: '/user/reservationDetail',
};

const ownerRoute = {
	main: '/owner',
	reservation: '/owner/reservation',
	register: '/owner/register',
	management: '/owner/management',
	income: '/owner/income',
	roomRegi: '/owner/roomRegi/',
};

export { userRoute, ownerRoute };
