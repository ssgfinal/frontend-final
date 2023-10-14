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

export { getCouponList };
