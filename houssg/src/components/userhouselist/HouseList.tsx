import { useQuery } from '@tanstack/react-query';
import { getUserHouseList } from '../../helper';
import { HouseBaseInfo } from '../../types';
import { houseKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

const HouseList = () => {
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: HouseBaseInfo[] }>([houseKey.userHouseList], () => getUserHouseList(), {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	console.log(data);
	return (
		isSuccess && (
			<>
				{data.data.map((data, idx) => (
					<BriefHouse house={data} key={idx} />
				))}
			</>
		)
	);
};

export default HouseList;
