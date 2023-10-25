import { api } from '../api';
import { userUrl } from '../assets/constant';

const getUserHouseList = async (search: string, type: string, select: string, page: number, { pageParam = 1 }) => {
	const resp = await api.get(userUrl.houseList, { params: { search, type, select, page, pageParam } });
	console.log(resp.data);
	return resp.data;
};

export { getUserHouseList };
