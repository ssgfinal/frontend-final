import { getScoreHouse, getSearchHouse, getUserHouseList } from '../../helper';

import { houseKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';
import { useEffect, useState } from 'react';

import { HouseBaseInfo } from '../../types';
import { useQuery } from '@tanstack/react-query';

interface HouseListProps {
	isSearch: string;
	isSelect: string;
	isCategory: string;
}

const HouseList: React.FC<HouseListProps> = ({ isSearch, isSelect, isCategory }) => {
	const [queryKey, setQueryKey] = useState(houseKey.userHouseList);
	const [queryFn, setQueryFn] = useState<S>(() => getUserHouseList());
	// TODO: useQuery 실패 ggㅠㅠ컴퍼넌트 분리하자
	// const queryKeyMain = [houseKey.userHouseList];
	// const queryKeyScore = [houseKey.scoreHouse];
	// const queryKeySearch = [houseKey.searchHouse];

	// const queryFnMain = () => getUserHouseList();
	// const queryFnScore = () => getUserHouseList();
	// const queryFnSearch = () => getUserHouseList();

	useEffect(() => {
		if (isSearch === '' && isSelect === '' && isCategory === '') {
			setQueryKey(houseKey.userHouseList);
			setQueryFn(() => getUserHouseList());
		} else if (isSearch && isCategory) {
			setQueryKey(houseKey.searchHouse);
			setQueryFn(() => getSearchHouse());
		} else if (isSelect) {
			setQueryKey(houseKey.scoreHouse);
			setQueryFn(() => getScoreHouse());
		}
	}, [isSearch, isSelect, isCategory]);

	// const { CommonLoading, CommonData, CommonSuccess, CommonError, ComError } = useCommonQuery(
	//     [queryKey, isSearch], () => getUserHouseList()
	//   );

	//   CommonError && console.log(ComError, 'error')

	const queryKeyParams = isSearch && isCategory !== null ? [queryKey, isSearch] : [queryKey];
	// main
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: HouseBaseInfo[] }>(queryKeyParams, queryFn, {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	console.log(queryFn);

	return isSuccess ? (
		data !== null ? (
			<>
				{data?.data.map((house, idx) => (
					<BriefHouse house={house} key={idx} />
				))}
			</>
		) : (
			<div>없습니다.</div>
		)
	) : null;
};

export default HouseList;
