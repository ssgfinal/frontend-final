import api from '../api/api';
import { userUrl } from '../assets/constant';

// 쿠폰
const getCouponList = () => api.get(userUrl.myCoupon);

const setCouponList = async (couponNumber: string) => {
	try {
		return await api.post(userUrl.enrollCoupon, { couponNumber: couponNumber });
	} catch (error) {
		console.error(error);
	}
};

// 리뷰
const getMyReviewList = () => api.get(userUrl.myReview);

export { getCouponList, setCouponList, getMyReviewList };
