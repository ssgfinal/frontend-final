import api from '../api/api';
import { userUrl } from '../assets/constant';

const getCouponList = async () => {
	try {
		return await api.get(userUrl.myCoupon);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const setCouponList = async (couponNumber: string) => {
	try {
		return await api.post(userUrl.enrollCoupon, { couponNumber: couponNumber });
	} catch (error) {
		alert('등록할 수 없는 쿠폰입니다.');
		console.error(error);
		throw error;
	}
};

export { getCouponList, setCouponList };
