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
	getIncomeApi,
	getRoomReservableDays,
	onEditManageHouseApi,
	addOfflineReservation,
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

// 유저 예약 내역 관련
import { setReview, getMyPreview, setReviewFormData, userCancelReservation, userReservationIsSuccess } from './userReservationDetailFunction';

// 메인
import { getMainCoupon } from './mainFunction';

// 숙소 상세
import { houseDetailLike, houseDetailDelete } from './userHouseDetail';

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
	getIncomeApi,
	getRoomReservableDays,
	onEditManageHouseApi,
	addOfflineReservation,
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

export { setReview, getMyPreview, setReviewFormData, userCancelReservation, userReservationIsSuccess };

export { getMainCoupon };

export { houseDetailLike, houseDetailDelete };
