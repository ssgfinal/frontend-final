import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { color } from '../../assets/styles';

const response = {
	house: ['고노도로 모텔', '무지개 호텔', 'paradise hotel', 'h1', 'h2'],
	importation: [
		{
			date: '01',
			'고노도로 모텔': 30000,
		},
		{
			date: '02',
			'고노도로 모텔': 20000,
		},
		{
			date: '03',
			'고노도로 모텔': 45000,
			'무지개 호텔': 20000,
		},
		{
			date: '04',
			'고노도로 모텔': 37000,
			'무지개 호텔': 47000,
			h2: 12340,
		},
		{
			date: '05',
			'고노도로 모텔': 26000,
			'무지개 호텔': 24000,
			h2: 12340,
		},
		{
			date: '06',
			'고노도로 모텔': 30000,
			'무지개 호텔': 40000,
			'paradise hotel': 22000,
		},
		{
			date: '07',
			'고노도로 모텔': 30000,
			'무지개 호텔': 40000,
			'paradise hotel': 22000,
		},
		{
			date: '08',
			'고노도로 모텔': 30000,
			'무지개 호텔': 40000,
			h1: 5000,
		},
		{
			date: '09',
			'고노도로 모텔': 30000,
			'무지개 호텔': 40000,
		},
		// {
		// 	date: '10',
		// },
		// {
		// 	date: '11',
		// },
		// {
		// 	date: '12',
		// },
	],
};

const OwnerIncome = () => {
	type HouseList = {
		[key: string]: boolean;
	};

	const colors = ['red', 'orange', 'green', 'blue', 'purple'];
	const [houseList, setHouseList] = useState<HouseList>({});
	const [chartSize, setChartSize] = useState({ width: 600, height: 400 });

	useEffect(() => {
		let houseObj = houseList;
		response.house.forEach((houseName) => {
			console.log(houseName);
			houseObj = {
				...houseObj,
				[houseName]: true,
			};
		});
		setHouseList(houseObj);

		const handleResize = () => {
			// 창 크기가 변경될 때마다 새로운 크기를 설정합니다.
			setChartSize({ width: window.innerWidth * 0.5, height: window.innerWidth * 0.4 });
		};

		// 초기 로딩 시 한 번 크기를 설정하고,
		handleResize();

		// 창 크기 변경 이벤트 리스너를 추가합니다.
		window.addEventListener('resize', handleResize);

		// 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleShowHouse = (houseName: string) => {
		let houseObj = houseList;
		houseObj = {
			...houseObj,
			[houseName]: !houseObj[houseName],
		};
		setHouseList(houseObj);
	};

	return (
		<Wrapper>
			<Title>월별 정산 내역</Title>
			<Contents>
				<Graph>
					<LineChart
						width={chartSize.width}
						height={chartSize.height}
						data={response.importation}
						margin={{
							top: 40,
							right: 40,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" domain={['dateMin-01', 'dateMax+12']} label={{ value: '(월)', position: 'right', offset: 15 }} />
						<YAxis label={{ value: '(만원)', position: 'top', offset: 20 }} />
						<Tooltip />
						<Legend />
						{houseList && response.house.map((h, idx) => <Line key={idx} type="monotone" dataKey={h} stroke={colors[idx]} hide={!houseList[h]} />)}
					</LineChart>
				</Graph>
				<HouseChoice>
					<HouseTitle>숙소</HouseTitle>
					{houseList &&
						Object.keys(houseList).map((h, idx) => (
							<OneHouse key={idx}>
								<input type="checkbox" onChange={() => handleShowHouse(h)} checked={houseList[h]} />
								&nbsp;{h}
							</OneHouse>
						))}
				</HouseChoice>
			</Contents>
		</Wrapper>
	);
};

export default OwnerIncome;

const Wrapper = styled.div`
	padding: 8vw;
`;

const Title = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
`;

const Contents = styled.div`
	display: grid;
	grid-template-columns: 70% 30%;
`;

const Graph = styled.div``;

const HouseChoice = styled.div`
	padding-top: 5vh;
	display: grid;
	grid-template-rows: 3rem;
	grid-auto-rows: 2rem;
	grid-gap: 1rem;
	text-align: left;
`;

const HouseTitle = styled.div`
	background-color: ${color.color2};
	padding: 1rem;
	color: white;
	border-radius: 1rem;
	text-align: center;
`;

const OneHouse = styled.div`
	padding: 1rem;
`;
