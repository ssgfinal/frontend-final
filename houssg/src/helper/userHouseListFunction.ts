import { api } from '../api';
import { userUrl } from '../assets/constant';

// 숙소 목록
const getUserHouseList = async () => {
	try {
		const resp = await api.get(userUrl.houseList);
		return resp.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// 평점 높은순
const getScoreHouse = async () => {
	try {
		const resp = await api.get(userUrl.scoreHouse);
		return resp.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
// 최근 등록순

// 검색
const getSearchHouse = async () => {
	try {
		const resp = await api.get(userUrl.searchHouse);
		return resp.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export { getUserHouseList, getScoreHouse, getSearchHouse };
