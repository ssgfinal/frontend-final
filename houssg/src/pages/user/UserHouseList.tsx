import React from 'react';

import { Select } from 'antd';
import { Input, Space, DatePicker } from 'antd';

import styled from 'styled-components';
import { accomodation } from '../../assets/icons';

import BriefHouse from '../../components/house/BriefHouse';
import { color } from '../../assets/styles';

const UserHouseList = () => {
	const handleChange = (value: { value: string; label: React.ReactNode }) => {
		console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
	};

	const { Search } = Input;

	const onSearch = (value: string) => console.log(value);

	const { RangePicker } = DatePicker;

	// 더미 데이터 (추후 삭제 예정)
	const house = [
		{
			houseId: 1,
			name: '무지개멘션',
			price: '38000원',
			rating: 1.3,
			location: '부산시 수영구 센텀',
			image: accomodation,
		},
		{
			houseId: 2,
			name: '무지개떡',
			price: '44000원',
			rating: 1.7,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 3,
			name: '파라다이스',
			price: '44000원',
			rating: 2.1,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 4,
			name: '환영펜션',
			price: '44000원',
			rating: 2.9,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 5,
			name: '환영펜션',
			price: '44000원',
			rating: 3.0,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 6,
			name: '환영펜션',
			price: '44000원',
			rating: 4.01,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 7,
			name: '환영펜션',
			price: '44000원',
			rating: 4.99,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 8,
			name: '환영펜션',
			price: '44000원',
			rating: 5,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 9,
			name: '환영펜션',
			price: '44000원',
			rating: 5.0,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 10,
			name: '환영펜션',
			price: '44000원',
			rating: 3,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			houseId: 11,
			name: '환영펜션',
			price: '44000원',
			rating: 0,
			location: '부산시 중구 남포',
			image: accomodation,
		},
	];

	// <Select>에 필요한 배열
	const category = [
		{
			value: '호텔',
			label: '호텔',
		},
		{
			value: '펜션',
			label: '펜션',
		},
	];

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

	return (
		<>
			<SearchWrapper>
				<Category>
					<Select
						labelInValue
						defaultValue={{ value: '카테고리', label: '카테고리' }}
						onChange={handleChange}
						options={category}
						style={{ width: '100%' }}
					/>
				</Category>
				<Date>
					<Space>
						<RangePicker id="date" />
					</Space>
				</Date>
				<SearchInput>
					<Search
						// id="search"
						placeholder=" 키워드로 찾아보세요."
						onSearch={onSearch}
						enterButton
						// size="large"
						// style={{ width: '100%' }}
					/>
				</SearchInput>
			</SearchWrapper>

			<SearchResultBar>
				<span style={{ margin: 'auto 0' }}> 50개의 검색 결과</span>
				<Select
					labelInValue
					defaultValue={{ value: order[0].value, label: order[0].value }}
					style={{ width: '8rem' }}
					onChange={handleChange}
					options={order}
				/>
			</SearchResultBar>
			<SearchResultContents>
				{house.map((h, idx) => (
					<BriefHouse house={h} key={idx} />
				))}
			</SearchResultContents>
		</>
	);
};

export default UserHouseList;

// 직접 작성한 태그의 스타일만 스타일드 컴포넌트로 적용 가능
// 라이브러리에서 들고온 태그의 스타일은 스타일드 컴포넌트로 해서 안 먹힐 수 있음-> 라이브러리에서 들고온 태그의 스타일은인라인으로 해야함
const SearchWrapper = styled.div`
	display: grid;

	margin: 1rem auto;
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
	//width: 100%;
	grid-area: c;
`;

const SearchResultBar = styled.div`
	margin: 1rem;
	display: flex;
	justify-content: space-between;
	padding: 1vw 5vw;
	background-color: #dcb0ff;

	.ant-select-selector:hover {
		border: 1px solid ${color.color1};
		background-color: #dcb0ff;
	}
`;

const SearchResultContents = styled.div`
	padding: 2rem;
	display: grid;
	grid-gap: 3rem;

	@media (min-width: 1400px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 1100px) and (max-width: 1400px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 700px) and (max-width: 1100px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;
