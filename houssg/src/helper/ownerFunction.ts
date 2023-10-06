import api from '../api/api';
import { ownerUrl } from '../assets/constant';

const getMyHouseListData = async () => {
	return await api.post(ownerUrl.myHouseList);
};

export { getMyHouseListData };
