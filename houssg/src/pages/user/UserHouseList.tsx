import React from 'react';
import { Select } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, DatePicker } from 'antd';
import styled from 'styled-components';
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
		},
		{
			name: '무지개떡',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '파라다이스',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
		{
			name: '환영펜션',
			price: '44000원',
			rating: 4.4,
			location: '부산시 중구 남포',
		},
	];
	return (
		<>
			<SearchWrapper>
				<Select
					labelInValue
					defaultValue={{ value: '부산역', label: '부산역' }}
					style={{ width: '120px', marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}
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
				/>
				<Select
					labelInValue
					defaultValue={{ value: '호텔', label: '호텔' }}
					style={{ width: '120px', marginLeft: '5px', marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}
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
				/>
				<Space>
					<RangePicker />
				</Space>
				<Space>
					<Search placeholder=" 키워드로 찾아보세요." onSearch={onSearch} enterButton style={{ width: '15rem' }} />
				</Space>
			</SearchWrapper>

			<div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5vw', paddingRight: '5vw', backgroundColor: '#DCB0FF' }}>
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
			</div>
			<div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2vw' }}>
				{house.map((h, idx) => (
					<BriefHouse house={h} key={idx} />
				))}
			</div>
		</>
	);
};

export default UserHouseList;

// 직접 작성한 태그의 스타일만 스타일드 컴포넌트로 적용 가능
// 라이브러리에서 들고온 태그의 스타일은 스타일드 컴포넌트로 해서 안 먹힐 수 있음-> 라이브러리에서 들고온 태그의 스타일은인라인으로 해야함
const SearchWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	//height: 50px;
	width: 60vw;
	border-radius: 100px;
	// background-color: #a178df;
	margin: 5px auto; // 해당 태그가 가로 중앙에 있고 싶을 때 마진을 건드리기
`;
