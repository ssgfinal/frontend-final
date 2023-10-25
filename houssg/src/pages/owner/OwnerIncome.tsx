import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { color } from '../../assets/styles';
import { useQuery } from '@tanstack/react-query';
import { ownerKey } from '../../assets/constant';
import { getIncomeApi } from '../../helper';
import { useDateStater } from '../../hooks';

type HouseList = {
	[key: string]: boolean;
};

interface MonthlyData {
	date: string;
	[key: string]: string;
}

interface YearlyData {
	[year: string]: MonthlyData[];
}

const OwnerIncome = () => {
	const colors = ['red', 'orange', 'green', 'blue', 'purple', 'olive', 'coral', 'deeppink', 'gold', 'lavender'];
	const [houseList, setHouseList] = useState<HouseList>({});
	const [chartSize, setChartSize] = useState({ width: 600, height: 400 });
	const [incomeList, setIncomeList] = useState<YearlyData>();
	const { currentYear, setNextYear, setPrevYear } = useDateStater();

	useEffect(() => {
		const handleResize = () => {
			if (window.screen.width < 850) {
				setChartSize({ width: window.screen.width * 0.8, height: window.screen.width * 0.6 });
			} else if (window.innerWidth > 850) {
				setChartSize({ width: window.innerWidth * 0.5, height: window.innerWidth * 0.3 });
			} else {
				setChartSize({ width: window.innerWidth * 0.8, height: window.innerWidth * 0.6 });
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const { isLoading, data, isSuccess, isError, error } = useQuery([ownerKey.income], () => getIncomeApi(), {
		cacheTime: 5 * 60 * 1000,
		staleTime: 60 * 60 * 1000,
	});

	useEffect(() => {
		let houseObj = houseList;
		if (data) {
			data.data.accommodationName.forEach((houseName: string) => {
				houseObj = {
					...houseObj,
					[houseName]: true,
				};
			});
			setHouseList(houseObj);

			const result: YearlyData = {};
			data.data.monthlySales.forEach(({ yearMonth, listOfAccom }: { yearMonth: string; listOfAccom: { [key: string]: string } }) => {
				const year = yearMonth.substring(0, 4);
				const month = yearMonth.substring(5, 7);

				if (!result[year]) {
					result[year] = [];
				}

				const monthlyData: MonthlyData = { date: month };

				for (const [accomName, price] of Object.entries(listOfAccom)) {
					monthlyData[accomName] = price;
				}

				result[year].push(monthlyData);
				result[year].sort((a, b) => {
					return parseInt(a.date) - parseInt(b.date);
				});
			});

			setIncomeList(result);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleShowHouse = (houseName: string) => {
		let houseObj = houseList;
		houseObj = {
			...houseObj,
			[houseName]: !houseObj[houseName],
		};
		setHouseList(houseObj);
	};

	isError && console.log(error);

	if (isLoading) {
		return <div>로딩중 ... </div>;
	}

	return (
		<Wrapper>
			<Title>
				<YearChanger $disabled={false} onClick={setPrevYear}>{`<< `}</YearChanger> {currentYear}년 정산 내역
				<YearChanger $disabled={false} onClick={setNextYear}>{` >>`}</YearChanger>
			</Title>
			{incomeList && (
				<Contents>
					<Graph>
						<LineChart
							width={chartSize.width}
							height={chartSize.height}
							data={incomeList[currentYear]}
							margin={{
								top: 40,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" domain={['dateMin-01', 'dateMax+12']} label={{ value: '월)', position: 'right', offset: 15 }} />
							<YAxis label={{ value: '(만원)', position: 'top', offset: 20 }} />

							<Tooltip />
							<Legend />
							{houseList &&
								Object.keys(houseList).map((h, idx: number) => (
									<Line key={idx} type="monotone" dataKey={h} stroke={colors[idx % 10]} hide={!houseList[h]} />
								))}
						</LineChart>
					</Graph>
					<HouseChoice>
						<HouseTitle>숙소</HouseTitle>
						<HouseContent>
							{houseList &&
								Object.keys(houseList).map((h, idx) => (
									<OneHouse key={idx}>
										<input type="checkbox" onChange={() => handleShowHouse(h)} checked={houseList[h]} />
										&nbsp;{h}
									</OneHouse>
								))}
						</HouseContent>
					</HouseChoice>
				</Contents>
			)}
		</Wrapper>
	);
};

export default OwnerIncome;

const Wrapper = styled.div`
	padding: 7vw;
`;

const Title = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
	gap: 1rem;

	@media screen and (max-width: 850px) {
		font-size: 1.6rem;
		gap: 0.9rem;
	}
`;

const Contents = styled.div`
	display: grid;

	@media (min-width: 850px) {
		grid-template-columns: 70% 30%;
		/* grid-gap: 2rem; */
	}
	@media (max-width: 850px) {
		/* margin-bottom: 0; */
		grid-template-columns: 100%;
	}
`;

const Graph = styled.div`
	display: flex;
	width: 100%;
`;

const HouseChoice = styled.div``;
const HouseTitle = styled.div`
	@media (min-width: 850px) {
		background-color: ${color.color2};
		padding: 1rem;
		color: white;
		border-radius: 1rem;
		text-align: center;
	}
	@media (max-width: 850px) {
		margin: 4rem auto;
		margin-bottom: 2rem;
		width: 50%;
		background-color: ${color.color2};
		padding: 0.7rem;
		color: white;
		border-radius: 1rem;
		text-align: center;
	}
`;

const HouseContent = styled.div`
	display: grid;
	text-align: left;
	border: solid ${color.color2};
	border-width: 1px;
	border-radius: 1rem;
	@media (min-width: 850px) {
		margin-top: 2vh;
		padding-top: 2vh;
		grid-auto-rows: 3rem;
		grid-gap: 1rem;
	}
	@media (max-width: 850px) {
		grid-template-columns: 50% 50%;
	}
	@media (max-width: 400px) {
		grid-template-columns: 100%;
	}
`;

const OneHouse = styled.div`
	padding: 1rem;
`;

const YearChanger = styled.span<{ $disabled: boolean }>`
	cursor: pointer;
	font-weight: 900;
`;
