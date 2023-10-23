import api from '../api/api';
import { userUrl } from '../assets/constant';

const getMainCoupon = () => api.get(userUrl.mainCoupon);

export { getMainCoupon };
