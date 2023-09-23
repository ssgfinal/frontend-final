const userRoute = {
	userMain: '/',
	userHouseList: '/user/house',
	userHouseDetail: '/user/house/:houseId',
	userMyPage: '/user/mypage',
	userReservationList: '/user/reservation',
	userReservation: '/user/reservation/:roomId',
};

const ownerRoute = {
	ownerMain: '/owner',
	ownerReservation: '/owner/reservation',
	ownerRegister: '/owner/register',
	ownerManagement: '/owner/management',
	ownerIncome: '/owner/income',
};

export { userRoute, ownerRoute };
