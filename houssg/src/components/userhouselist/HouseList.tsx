import { getUserHouseList } from '../../helper';

import { userKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

import { HouseBaseInfo } from '../../types';
import { useQuery } from '@tanstack/react-query';

interface HouseListProps {
	search: string;
	select: string;
	type: string;
}

const HouseList: React.FC<HouseListProps> = ({ search, select, type }) => {
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: HouseBaseInfo[] }>(
		[userKey.userHouseList, search, type, select],
		() => getUserHouseList(search, type, select),
		{
			cacheTime: 5 * 60 * 1000,
			staleTime: 2 * 60 * 1000,
			retry: 2,
		},
	);

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	console.log(data);

	return isSuccess ? (
		<>
			{data.data?.map((house, idx) => (
				<BriefHouse house={house} key={idx} />
			))}
		</>
	) : (
		<div>검색 결과가 없습니다.</div>
	);
};

export default HouseList;
