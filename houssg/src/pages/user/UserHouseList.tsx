import React from 'react';
import { Select } from 'antd';
import { Input, Space, DatePicker } from 'antd';

import styled from 'styled-components';
import { accomodation } from '../../assets/icons';

import BriefHouse from '../../components/BriefHouse';

const UserHouseList = () => {
	const handleChange = (value: { value: string; label: React.ReactNode }) => {
		console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
	};

	const { Search } = Input;

	const onSearch = (value: string) => console.log(value);

	const { RangePicker } = DatePicker;

	const house = [
		{
			name: '무지개멘션',
			price: '38000원',
			rating: 3.4,
			location: '부산시 수영구 센텀',
			image: accomodation,
		},
		{
			name: '무지개떡',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '파라다이스',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
			image: accomodation,
		},
	];
	return (
		<>
			<SearchWrapper>
				<Select
					labelInValue
					defaultValue={{ value: '지하철역', label: '지하철역' }}
					onChange={handleChange}
					options={[
						{
							value: '부산역',
							label: '부산역',
						},
						{
							value: '남포동',
							label: '남포동',
						},
					]}
					style={{ width: '15rem' }}
				/>
				<Select
					labelInValue
					defaultValue={{ value: '카테고리', label: '카테고리' }}
					onChange={handleChange}
					options={[
						{
							value: '호텔',
							label: '호텔',
						},
						{
							value: '펜션',
							label: '펜션',
						},
					]}
					style={{ width: '15rem' }}
				/>
				<Space style={{ width: '15rem' }}>
					<RangePicker />
				</Space>
				<Space style={{ width: '15rem' }}>
					<Search placeholder=" 키워드로 찾아보세요." onSearch={onSearch} enterButton style={{ width: '15rem' }} />
				</Space>
			</SearchWrapper>

			<SearchResultBar>
				<span style={{ margin: 'auto 0' }}> 50개의 검색 결과</span>
				<Select
					labelInValue
					defaultValue={{ value: '평점 높은순', label: '평점 높은순' }}
					style={{ width: 120, marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '5px', justifyContent: 'flex-end' }}
					onChange={handleChange}
					options={[
						{
							value: '평점 높은순',
							label: '평점 높은순',
						},
						{
							value: '최근 등록순',
							label: '최근 등록순',
						},
					]}
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
	width: 50rem;
	//margin: 5px auto; // 해당 태그가 가로 중앙에 있고 싶을 때 마진을 건드리기
	margin: 1rem auto;
	grid-gap: 1rem;

	@media (min-width: 1400px) {
		grid-template-columns: 1fr 1fr 2fr 2fr;
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

const SearchResultBar = styled.div`
	margin: 1rem;
	display: flex;
	justify-content: space-between;
	padding-left: 5vw;
	padding-right: 5vw;
	background-color: #dcb0ff;
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
