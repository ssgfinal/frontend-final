import { Select } from 'antd';
import { Input } from 'antd';
// import { Input, Space, DatePicker } from 'antd';

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
			value: '평점 높은순',
			label: '평점 높은순',
		},
		{
			value: '최근 등록순',
			label: '최근 등록순',
		},
	];

	const [type, setType] = useState<string>(houseCategory[0].value);
	const [search, setSearch] = useState<string>('');
	const [select, setSelect] = useState<string>(order[0].value);

	// 검색 카테고리
	const onCategorySearch = (value: { value: string; label: React.ReactNode }) => {
		setType(value.value);
	};

	// 검색어
	const onSearch = (value: string) => {
		setSearch(value);
	};

	// 선택 카테고리
	const onCategorySelect = (value: { value: string; label: React.ReactNode }) => {
		setSelect(value.value);
	};

	// TODO: 기간 검색
	// const { RangePicker } = DatePicker;

	return (
		<>
			<SearchWrapper>
				<Category>
					<Select
						labelInValue
						defaultValue={{ value: houseCategory[0].value, label: houseCategory[0].value }}
						onChange={onCategorySearch}
						options={houseCategory}
						style={{ width: '100%' }}
					/>
				</Category>
				{/* <Date>
					<Space>
						<RangePicker id="date" />
					</Space>
				</Date> */}
				<SearchInput>
					<Search placeholder=" 키워드로 찾아보세요." onSearch={onSearch} enterButton />
				</SearchInput>
			</SearchWrapper>
			<SearchResultBar>
				<Select
					labelInValue
					defaultValue={{ value: order[0].value, label: order[0].value }}
					style={{ width: '8rem' }}
					onChange={onCategorySelect}
					options={order}
				/>
			</SearchResultBar>
			<SearchResultContents>
				<HouseList search={search} select={select} type={type} />
			</SearchResultContents>
		</>
	);
};

export default UserHouseList;

const SearchWrapper = styled.div`
	display: flex;
	margin: 3rem 0;
	grid-gap: 1rem;
	justify-content: center;
`;

const Category = styled.div`
	width: 18%;
`;

const SearchInput = styled.div`
	width: 45%;

	button {
		background-color: ${color.color1};
	}
`;

const SearchResultBar = styled.div`
	display: flex;
	justify-content: flex-end;
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
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
`;
