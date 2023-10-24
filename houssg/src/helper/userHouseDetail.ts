import api from '../api/api';
import { userUrl } from '../assets/constant';

// 찜하기
const houseDetailLike = (accomNumber: number) => {
	return api.post(userUrl.like, null, { params: { accomNumber } });
};

// 찜 해제
const houseDetailDelete = (accomNumber: number) => {
	return api.delete(userUrl.like, { params: { accomNumber } });
};
export { houseDetailLike, houseDetailDelete };
