import { api } from '../api';
import { userUrl } from '../assets/constant';

// 숙소 목록
const getUserHouseList = () => api.get(userUrl.houseList);

// 평점 높은순
const getScoreHouse = () => api.get(userUrl.scoreHouse);
// 최근 등록순

// 검색
const getSearchHouse = () => api.get(userUrl.searchHouse);

export { getUserHouseList, getScoreHouse, getSearchHouse };
