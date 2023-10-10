import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import Rating from '../common/Rating';

import { houseServiceCategory } from '../../assets/constant';
import HeartIcons from '../common/HeartIcons';
import { color } from '../../assets/styles';
import { useLocation } from 'react-router-dom';
export const HouseInfo = () => {
	const location = useLocation();
	const house = location.state.house;

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const [isLoading, setIsLoading] = useState(false);

	interface ServiceList {
		value: string;
		text: string;
		icon: string;
	}
	const [accomServices, setAccomServices] = useState<ServiceList[]>([]);

	useEffect(() => {
		const updatedServices: ServiceList[] = [];
		house &&
			house.service.forEach((existence: number, idx: number) => {
				if (existence === 1) {
					updatedServices.push(houseServiceCategory[idx]);
				}
			});
		setAccomServices(updatedServices);
		setIsLoading(true);
	}, [house]);

	return (
		<Container>
			<AccomImg>
				<Img src={house.img} />
				<OverHeartIcon>
					<HeartIcons favorite={house.isFavorite} />
				</OverHeartIcon>
			</AccomImg>
			<Info>
				<OneLine>
					<div>센텀 무지개 호텔</div>
					<HeartIcons favorite={house.isFavorite} />
				</OneLine>
				<RateBox>
					<Rating rate={house.avgRating} readonly />
				</RateBox>
				(후기 : {house.reviewCount.toLocaleString()}개)
				<div>{house.accomAddress}</div>
				<div>
					입실 ~ 퇴실 : {house.checkIn}시 ~ {house.checkOut}시
				</div>
				<div>
					<div>
						시설 및 서비스
						<br />
						{isLoading && (
							<Service>
								{accomServices.length <= 5 ? (
									accomServices.map((service, idx) => <Icon key={idx} src={service.icon} alt={service.text} />)
								) : (
									<>
										{accomServices.slice(0, 5).map((service, idx) => (
											<Icon key={idx} src={service.icon} alt={service.text} />
										))}
										<MoreService onClick={toggleDropdown}>더보기 {isDropdownOpen ? '▲' : '▼'}</MoreService>
									</>
								)}
							</Service>
						)}
					</div>
					{isDropdownOpen && accomServices.length > 5 && (
						<DropdownContent>
							{accomServices.slice(5).map((service, idx) => (
								<Icon key={idx} src={service.icon} alt={service.text} />
							))}
						</DropdownContent>
					)}
				</div>
			</Info>
		</Container>
	);
};

const Container = styled.div`
	margin: 5rem 0;
	display: grid;
	@media (min-width: 750px) {
		grid-template-columns: 65% 35%;
		grid-gap: 2rem;
	}
	@media (max-width: 750px) {
		margin-bottom: 0;
		grid-template-columns: 1fr;
	}
`;

const AccomImg = styled.div`
	position: relative;
	width: 100%;
`;

const OverHeartIcon = styled.div`
	position: absolute;
	width: 10%;
	bottom: 1rem;
	right: 1rem;
`;

const Img = styled.img`
	width: 100%;
	border-radius: 1rem;
`;

const Info = styled.div`
	padding: 3rem 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1rem;
	text-align: left;
	align-items: center;
`;

const OneLine = styled.div`
	display: grid;
	grid-template-columns: 90% 10%;
	/* display: flex;
	justify-content: space-between; */
	font-weight: bold;
	font-size: 1.6rem;
	align-items: start;
	/* align-self: center; */
`;
const MoreService = styled.button`
	&:hover {
		cursor: pointer;
	}
	width: 5rem;
	background-color: white;
	border-width: 0;
	font-size: 12px;
	color: ${color.darkGrayColor};
`;

const DropdownContent = styled.div`
	position: absolute;
`;

const Icon = styled.img`
	margin: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
`;

const RateBox = styled.div`
	width: 30%;
`;
const Service = styled.div`
	display: flex;
`;
