// TODO: useQuery 커스텀 훅 실패 ggㅠㅠ
// import { useQuery } from '@tanstack/react-query';

// import { getScoreHouse, getSearchHouse, getUserHouseList } from '.';

// const queryFunc = { getUserHouseList, getScoreHouse, getSearchHouse };

// const useCommonQuery = (queryKey: string[] | null, params: string | null) => {
// 	const {
// 		isLoading: CommonLoaging,
// 		data: CommonData,
// 		isSuccess: CommonSuccess,
// 		isError: CommonError,
// 		error: ComError,
// 	} = useQuery([queryKey, params], () => queryFunc, {
// 		cacheTime: 5 * 60 * 1000,
// 		staleTime: 2 * 60 * 1000,
// 		retry: 2,
// 	});

// 	return { CommonLoaging, CommonData, CommonSuccess, CommonError, ComError };
// };

// export default useCommonQuery;
