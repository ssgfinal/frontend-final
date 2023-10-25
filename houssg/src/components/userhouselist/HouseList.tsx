import { getUserHouseList } from '../../helper';

import { userKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import styled from 'styled-components';
import { SearchHouse } from '../../types';

interface HouseListProps {
	search: string;
	select: string;
	type: string;
}

const HouseList: React.FC<HouseListProps> = ({ search, select, type }) => {
	const { isLoading, isFetching, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<{
		data: SearchHouse[];
		totalCount: number;
	}>([userKey.userHouseList, search, type, select], ({ pageParam = 1 }) => getUserHouseList(search, type, select, pageParam), {
		getNextPageParam: (lastPage, pages) => {
			const maxPage = Math.ceil(lastPage.totalCount / 24);
			const nextPage = pages.length + 1;

			if (nextPage <= maxPage) {
				return nextPage;
			} else {
				return undefined;
			}
		},
	});

	useEffect(() => {
		const onScroll = async () => {
			const scrollY = window.scrollY;
			const innerHeight = window.innerHeight;
			const scrollMaxY = document.documentElement.scrollHeight - innerHeight;

			if (scrollY >= scrollMaxY - 250 && hasNextPage && !isFetching) {
				fetchNextPage();
			}
		};

		document.addEventListener('scroll', onScroll);

		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [fetchNextPage, hasNextPage, isFetching]);

	isError && console.log(error);

	if (isLoading) {
		return <NonBox>로딩중...</NonBox>;
	}

	return (
		<>
			{data !== undefined && data.pages[0].data.length > 0 ? (
				<>
					{data.pages !== undefined ? (
						<>
							{data.pages.map((group, idx) => (
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
						<></>
					)}
				</>
			) : (
				<NonBox>등록된 숙소가 없습니다.😥</NonBox>
			)}
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

const NonBox = styled.div`
	margin: 1rem 0;
`;
