import { getUserHouseList } from '../../helper';

import { userKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

import { SearchHouse } from '../../types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// import { useEffect, useState } from 'react';
// import { useIntersectionObserver } from '../../helper/observerFunction';

interface HouseListProps {
	search: string;
	select: string;
	type: string;
}

const HouseList: React.FC<HouseListProps> = ({ search, select, type }) => {
	const pageSize = 5;
	const page = 1;

	const [fetching, setFetching] = useState(false);

	// const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<{ data: SearchHouse[] }>(
	// 	[userKey.userHouseList, search, type, select, pageSize, page, 1],
	// 	({ pageParam = 1 }) => getUserHouseList(search, type, select, pageSize, page, { pageParam }),
	// 	{
	// 		getNextPageParam: (lastPage) => {
	// 			const nextPage = lastPage.data[0].page.length + 1;
	// 			return nextPage <= pageSize ? nextPage : undefined;
	// 		},
	// 	},
	// );

	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<{ data: SearchHouse[] }>(
		[userKey.userHouseList, search, type, select, pageSize, page],
		({ pageParam = 1 }) => getUserHouseList(search, type, select, pageSize, page, pageParam),
		{
			getNextPageParam: (_lastPage, pages) => {
				const nextPage = pages.length + 1;
				return nextPage <= pageSize ? nextPage : undefined;
				// if (pages.length < 2) {
				// 	console.log('getNextPageParam함수 내 pages 길이는?' + pages.length);
				// 	return pages.length + 1 && page + 1;
				// } else {
				// 	return undefined;
				// }
				// const nextPage = lastPage.data.length + 1;

				// return nextPage <= pageSize ? nextPage : undefined;

				// if (lastPage !== undefined) {
				// 	const nextPage = lastPage.data.length + 1;
				// 	console.log('lastPage>>' + JSON.stringify(lastPage));
				// 	return nextPage <= pageSize ? nextPage : undefined;
				// }
			},
		},
	);

	console.log('useInfiniteQuery data>>>' + JSON.stringify(data));
	console.log('페이지 파람>>>>>' + JSON.stringify(data?.pageParams));

	useEffect(() => {
		const onScroll = async (e) => {
			const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;

			if (!fetching && scrollHeight - scrollTop <= clientHeight) {
				setFetching(true);
				if (data && hasNextPage) {
					const nextPagePromises = data.pages.map(() => fetchNextPage());
					await Promise.all(nextPagePromises);
					console.log('스크롤!!!!!>>>>>');
				}
				setFetching(false);
			}
		};

		document.addEventListener('scroll', onScroll);

		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [data, fetchNextPage, hasNextPage, fetching]);

	// console.log('페이지 확인' + page);
	console.log('데이터 확인' + JSON.stringify(data) + '    그럼 fetching은??' + fetching);

	// const listQuery = useQuery({ queryKey: [userKey.userHouseList], queryFn: getUserHouseList });

	isError && console.log(error);

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<>
			{data?.pages !== undefined ? (
				<>
					{data?.pages.map((group, idx) => (
						<ListWrapper key={idx}>
							{group.data.map((house) => (
								<SearchResultContents key={house.accomNumber}>
									<BriefHouse house={house} key={house.accomNumber} />
								</SearchResultContents>
							))}
						</ListWrapper>
					))}
				</>
			) : (
				<>검색결과가 없습니다.</>
			)}
			<div></div>
		</>
	);
};

export default HouseList;

const ListWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	row-gap: 1rem;
	justify-items: flex-start;
`;

const SearchResultContents = styled.div`
	width: 25%;

	@media (min-width: 1020px) and (max-width: 1100px) {
		width: 33.3%;
	}

	@media (min-width: 500px) and (max-width: 1020px) {
		width: 50%;
	}

	@media (max-width: 500px) {
		width: 100%;
	}
`;
