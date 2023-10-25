import { api } from '../api';
import { userUrl } from '../assets/constant';

const getUserHouseList = async (search: string, type: string, select: string, page: number) => {
	const resp = await api.get(userUrl.houseList, { params: { search, type, select, page } });
	return resp.data;
};

export { getUserHouseList };
