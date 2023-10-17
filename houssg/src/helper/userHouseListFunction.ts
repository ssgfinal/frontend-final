import { api } from '../api';
import { userUrl } from '../assets/constant';

// 숙소 목록
// const getUserHouseList = async (search: string, type: string) => {
// 	try {
// 		const resp = await api.get(userUrl.houseList, { params: { search, type } });
// 		return resp;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// };

// const getUserHouseList = async (search: string, type: string, select: string) => {
// 	try {
// 		const resp = await api.get(userUrl.houseList, { params: { search, type, select } });
// 		return resp;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// };

const getUserHouseList = async (search: string, type: string, select: string, pageSize: number, page: number, { pageParam = 1 }) => {
	try {
		const resp = await api.get(userUrl.houseList, { params: { search, type, select, pageSize, page, pageParam } });
		console.log('비동기 실행시' + JSON.stringify(resp.data));
		return resp;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export { getUserHouseList };
