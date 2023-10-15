import { Select } from 'antd';
import { Input, Space, DatePicker } from 'antd';

import styled from 'styled-components';
import { color } from '../../assets/styles';

import { houseCategory } from '../../assets/constant';
import HouseList from '../../components/userhouselist/HouseList';
import { useState } from 'react';

const UserHouseList = () => {
	const { Search } = Input;

	// <Select>에 필요한 배열
	const order = [
		{
			value: '최근 등록순',
			label: '최근 등록순',
		},
		{
			value: '평점 높은순',
			label: '평점 높은순',
		},
	];

	const [isCategory, setIsCategory] = useState<string>('');
	const [isSearch, setIsSearch] = useState<string>('');
	const [isSelect, setIsSelect] = useState<string>('');

	// 검색 카테고리
	const onCategorySearch = (value: { value: string; label: React.ReactNode }) => {
		setIsCategory(value.value);
	};

	// 검색어
	const onSearch = (value: string) => {
		setIsSearch(value);
	};

	// 선택 카테고리
	const onCategorySelect = (value: { value: string; label: React.ReactNode }) => {
		setIsSelect(value.value);
	};

	const { RangePicker } = DatePicker;

	return (
		<>
			<SearchWrapper>
				<Category>
					<Select
						labelInValue
						defaultValue={{ value: '카테고리', label: '카테고리' }}
						onChange={onCategorySearch}
						options={houseCategory}
						style={{ width: '100%' }}
					/>
				</Category>
				<Date>
					<Space>
						<RangePicker id="date" />
					</Space>
				</Date>
				<SearchInput>
					<Search placeholder=" 키워드로 찾아보세요." onSearch={onSearch} enterButton />
				</SearchInput>
			</SearchWrapper>
			<SearchResultBar>
				<span style={{ margin: 'auto 0' }}> 50개의 검색 결과</span>
				<Select
					labelInValue
					defaultValue={{ value: order[0].value, label: order[0].value }}
					style={{ width: '8rem' }}
					onChange={onCategorySelect}
					options={order}
				/>
			</SearchResultBar>
			<SearchResultContents>
				<HouseList isSearch={isSearch} isSelect={isSelect} isCategory={isCategory} />
			</SearchResultContents>
		</>
	);
};

export default UserHouseList;

// 직접 작성한 태그의 스타일만 스타일드 컴포넌트로 적용 가능
// 라이브러리에서 들고온 태그의 스타일은 스타일드 컴포넌트로 해서 안 먹힐 수 있음-> 라이브러리에서 들고온 태그의 스타일은인라인으로 해야함
const SearchWrapper = styled.div`
	display: grid;
	margin: 3rem auto;
	grid-gap: 1rem;

	@media (min-width: 1400px) {
		width: 50%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a b c';
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		width: 45%;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'a b' 'c c';
	}

	@media (max-width: 700px) {
		width: 50%;
		grid-template-columns: repeat(1, 1fr);
		grid-template-areas: 'a ' 'b' ' c';
	}
`;

const Category = styled.div`
	grid-area: a;
`;

const Date = styled.div`
	grid-area: b;
`;

const SearchInput = styled.div`
	grid-area: c;
	button {
		background-color: ${color.color1};
	}
`;

const SearchResultBar = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1vw 5vw;
	color: ${color.color1};
	border: 1px solid ${color.color3};
	border-left: none;
	border-right: none;

	.ant-select-selector {
		color: ${color.color1};
	}
`;

const SearchResultContents = styled.div`
	padding: 2rem;
	display: grid;

	@media (min-width: 1400px) {
		grid-template-columns: repeat(4, 25%);
	}

	@media (min-width: 1100px) and (max-width: 1400px) {
		grid-template-columns: repeat(3, 33%);
	}

	@media (min-width: 700px) and (max-width: 1100px) {
		grid-template-columns: repeat(2, 50%);
	}

	@media (max-width: 700px) {
		grid-template-columns: 100%;
	}
`;
