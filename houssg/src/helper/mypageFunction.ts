import api from '../api/api';
import { userUrl } from '../assets/constant';

// 쿠폰
const getMyCouponList = () => api.get(userUrl.myCoupon);

const setMyCouponList = async (couponNumber: string) => {
	try {
		return await api.post(userUrl.enrollCoupon, { couponNumber: couponNumber });
	} catch (error) {
		console.error(error);
	}
};

// 리뷰
const getMyReviewList = () => api.get(userUrl.myReview);

// 찜
const getMyFavoriteList = () => api.get(userUrl.myFavorite);

export { getMyCouponList, setMyCouponList, getMyReviewList, getMyFavoriteList };
