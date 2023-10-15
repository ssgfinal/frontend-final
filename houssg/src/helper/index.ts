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
import { getMyHouseListData, onRegiFunnelData, getHouseReview, addReviewComment, patchReviewComment } from './ownerFunction';

// 객실 관련
import { getTargetRoomData, addTargetRoom, returnRoomFormData, editTargetRoom } from './roomFunction';

// 마이페이지 관련
import { getMyCouponList, setMyCouponList, getMyReviewList, getMyFavoriteList } from './mypageFunction';

// 숙소 목록 관련
import { getUserHouseList, getScoreHouse, getSearchHouse } from './userHouseListFunction';

export { authLoginFunc, authSignUpFunc, kakaoLoginFunc, kakaoSignUp, nickCheckFunc, idCheckFunc, onPhoneUsableCheck, phoneAuthCheck, onFindId };

export { getMyHouseListData, onRegiFunnelData, getHouseReview, addReviewComment, patchReviewComment };

export { getTargetRoomData, addTargetRoom, editTargetRoom, returnRoomFormData };

export { getMyCouponList, setMyCouponList, getMyReviewList, getMyFavoriteList };

export { getUserHouseList, getScoreHouse, getSearchHouse };
