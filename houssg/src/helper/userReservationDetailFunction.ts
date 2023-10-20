import api from '../api/api';
import { userUrl } from '../assets/constant';

// 리뷰
const getMyPreview = (reservationNumber: number) => {
	return api.get(userUrl.preview, { params: { reservationNumber: reservationNumber } });
};

export { getMyPreview };
