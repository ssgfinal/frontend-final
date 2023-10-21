// 로그인 관련
import {
	authLoginFunc,
	authSignUpFunc,
	kakaoLoginFunc,
	kakaoSignUp,
	nickCheckFunc,
	idCheckFunc,
	onPhoneUsableCheck,
	phoneAuthCheck,
	onFindId,
} from './authFunction';

// 사업자 관련
import {
	getMyHouseListData,
	onRegiFunnelData,
	getHouseReview,
	addReviewComment,
	patchReviewComment,
	checkMyHouseReservation,
	getHouseReservation,
	getReservableRoomList,
	reportReview,
	requestHouseDelete,
	deleteRoom,
	cancelReservation,
} from './ownerFunction';

// 객실 관련
import { getTargetRoomData, addTargetRoom, returnRoomFormData, editTargetRoom } from './roomFunction';

// 마이페이지 관련
import {
	setUpdateNickName,
	setUpdatePassword,
	smsMyPhoneAuth,
	setNewPhoneNumber,
	getMyCouponList,
	setMyCouponList,
	getMyReviewList,
	getMyFavoriteList,
} from './mypageFunction';

// 숙소 목록 관련
import { getUserHouseList } from './userHouseListFunction';

export { authLoginFunc, authSignUpFunc, kakaoLoginFunc, kakaoSignUp, nickCheckFunc, idCheckFunc, onPhoneUsableCheck, phoneAuthCheck, onFindId };

// 사업자
export {
	getMyHouseListData,
	onRegiFunnelData,
	getHouseReview,
	addReviewComment,
	patchReviewComment,
	checkMyHouseReservation,
	getHouseReservation,
	getReservableRoomList,
	reportReview,
	requestHouseDelete,
	deleteRoom,
	cancelReservation,
};

export { getTargetRoomData, addTargetRoom, editTargetRoom, returnRoomFormData };

// 마이페이지
export {
	setUpdateNickName,
	setUpdatePassword,
	smsMyPhoneAuth,
	setNewPhoneNumber,
	getMyCouponList,
	setMyCouponList,
	getMyReviewList,
	getMyFavoriteList,
};

export { getUserHouseList };
