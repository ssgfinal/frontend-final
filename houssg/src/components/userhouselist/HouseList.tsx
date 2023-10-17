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
	const pageSize = 12;
	const [page, setPage] = useState<number>(1);
	// const [lastPage, setLastPage] = useState(false);
	const maxPage = 200 / 20;

	console.log('1번째 실행' + page);
	const [fetching, setFetching] = useState(false);

	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<{ data: SearchHouse[] }>(
		[userKey.userHouseList, search, type, select, pageSize, page],
		({ pageParam = 1 }) => getUserHouseList(search, type, select, pageSize, page, pageParam),
		{
			getNextPageParam: (_, pages) => {
				const lastPage = pages.length + 1;
				console.log('3번째 실행' + page);
				return lastPage < maxPage ? lastPage + 1 : undefined;
				// if (lastPage <= maxPage) {
				// 	return lastPage < maxPage ? lastPage + 1 : undefined;
				// } else {
				// 	console.log('마지막 페이지입니다.' + page);
				// 	return undefined;
				// }

				// if (lastPage > maxPage) {
				// 	// console.log('마지막 페이지입니다.' + page);
				// 	// alert('마지막 페이지입니다.');
				// 	return undefined;
				// }

				// {
				// 	nextPage <= maxPage ? nextPage : undefined;
				// }
			},
		},
	);

	// data && setPage(page + 1);
	console.log('2번째 실행' + page);

	useEffect(() => {
		const onScroll = async () => {
			const scrollY = window.scrollY;
			const innerHeight = window.innerHeight;
			const scrollMaxY = document.documentElement.scrollHeight - innerHeight;

			if (!fetching && scrollY >= scrollMaxY) {
				setFetching(true);
				if (data && hasNextPage) {
					const nextPagePromises = data.pages.map(() => fetchNextPage());
					await Promise.all(nextPagePromises);
				}
				setFetching(false);
			}
		};

		document.addEventListener('scroll', onScroll);

		if (page <= maxPage && data !== undefined && data.pages[0].data.length > 1) {
			setPage(page + 1);
		}
		// if (page <= maxPage && data === undefined) {
		// 	setLastPage(true);
		// }
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [data, fetchNextPage, hasNextPage, fetching, page, maxPage]);

	// if (lastPage) {
	// 	<>마지막 페이지입니다.</>;
	// 	return setLastPage(false);
	// }

	isError && console.log(error);

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	//TODO: 사진이 들어왔다가 사라짐???
	return (
		<div>
			<ListWrapper>
				{data?.pages.map((group, idx) => (
					<div key={idx}>
						{group.data.map((house) => (
							<SearchResultContents key={house.accomNumber}>
								<BriefHouse house={house} key={house.accomNumber} />
							</SearchResultContents>
						))}
					</div>
				))}
			</ListWrapper>
		</div>
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
