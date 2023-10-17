import { getUserHouseList } from '../../helper';

import { userKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

import { SearchHouse } from '../../types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface HouseListProps {
	search: string;
	select: string;
	type: string;
}

const HouseList: React.FC<HouseListProps> = ({ search, select, type }) => {
	const pageSize = 5;

	const [page, setPage] = useState(1);

	const [fetching, setFetching] = useState(false);

	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<{ data: SearchHouse[] }>(
		[userKey.userHouseList, search, type, select, pageSize, page],
		({ pageParam = 1 }) => getUserHouseList(search, type, select, pageSize, page, pageParam),
		{
			getNextPageParam: (_lastPage, pages) => {
				const maxPage = 200 / 20;
				const page = pages.length + 1;
				if (page <= maxPage) {
					console.log('아직 작습니다.');
					return setPage(page);
				} else {
					console.log('마지막 페이지입니다.');
					alert('마지막 페이지입니다.');
					return undefined;
				}
				// {
				// 	nextPage <= maxPage ? nextPage : undefined;
				// }
				// nextPage <= maxPage ? nextPage : undefined;
			},
		},
	);

	console.log('페이지는?' + page);

	console.log('useInfiniteQuery data>>>' + JSON.stringify(data));
	console.log('페이지 파람>>>>>' + JSON.stringify(data?.pageParams));

	useEffect(() => {
		const onScroll = async () => {
			const scrollY = window.scrollY || window.pageYOffset; // 스크롤 위치
			const innerHeight = window.innerHeight; // 창의 높이
			const scrollMaxY = document.documentElement.scrollHeight - innerHeight; // 최대 스크롤 가능한 위치

			if (!fetching && scrollY >= scrollMaxY) {
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
