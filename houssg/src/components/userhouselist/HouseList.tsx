import { getUserHouseList } from '../../helper';

import { userKey } from '../../assets/constant/queryKey';
import BriefHouse from '../house/BriefHouse';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchHouse } from '../../types';

interface HouseListProps {
	search: string;
	select: string;
	type: string;
}

const HouseList: React.FC<HouseListProps> = ({ search, select, type }) => {
	const [page, setPage] = useState<number>(1);

	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery<{ data: SearchHouse[]; totalCount: number; page: [] }>(
		[userKey.userHouseList, search, type, select, page],
		({ pageParam = 1 }) => getUserHouseList(search, type, select, page, pageParam),
		{
			getNextPageParam: (lastPage, pages) => {
				const maxPage = Math.ceil(lastPage.totalCount / 24);
				const nextPage = pages.length;
				console.log('nextPage', nextPage);
				//TODO: 페이지 누적이 안 됨(fetchNextPage)
				/* 공식 문서에서!!!
				>> fetchNextPage 가져오기가 진행 중인 동안 호출하면 데이터 새로고침 위험이 있음
				>> 목록을 렌더링하고 fetchNextPage 동시에 트리거할 때 중요
				>> InfiniteQuery 진행 중인 가져오기는 단 한 번만 가능
				>> 단일 캐시 항목이 모든 페이지에 공유되므로 동시에 두 번 가져오려고 하면 데이터 덮어쓰기가 발생
				>> 무슨 소리고..?
				*/
				if (nextPage <= maxPage && pages[0].data.length === 0) {
					setPage(page);
					if (nextPage <= maxPage && pages[0].data.length > 1) {
						setPage(page + 1);
					}
				} else {
					return undefined;
				}
			},
		},
	);

	useEffect(() => {
		const onScroll = async () => {
			const scrollY = window.scrollY; // 현재 세로축(Y축) 스크롤 위치를 나타내는 변수(맨 위에서부터 얼마나 떨어져 있는지)
			const innerHeight = window.innerHeight; //스크롤바를 포함한 스크롤 가능한 영역의 내부 높이
			const scrollMaxY = document.documentElement.scrollHeight - innerHeight; // 스크롤 가능한 전체 문서의 세로 높이에서 스크롤바의 내부 높이(innerHeight)를 뺀 값

			if (scrollY >= scrollMaxY && hasNextPage) {
				fetchNextPage();
			}
		};

		document.addEventListener('scroll', onScroll);

		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [fetchNextPage, hasNextPage, page]);

	// 검색, 카테고리, 필터 선택시 페이지 초기화
	useEffect(() => {
		setPage(1);
	}, [type, select, search]);

	isError && console.log(error);

	if (isLoading) {
		return <NonBox>로딩중...</NonBox>;
	}

	console.log('page', page);
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
