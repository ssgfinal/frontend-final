import { useState } from 'react';
import { styled } from 'styled-components';

import { accomodation } from '../../assets/icons';
import Rating from '../common/Rating';

import { houseServiceCategory } from '../../assets/constant';
import HeartIcons from '../common/HeartIcons';
import { color } from '../../assets/styles';
export const HouseInfo = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const rate = 3.4;
	const location = '부산시 수영구 수영동';
	const reviewCnt = 11400;
	const startTime = 13;
	const endTime = 11;

	const accservice = [1, 1, 0, 0, 1, 0, 1, 1, 0, 1];

	interface ServiceList {
		value: string;
		text: string;
		icon: string;
	}
	const accomServices: ServiceList[] = [];

	accservice.forEach((existence, idx) => {
		if (existence == 1) {
			accomServices.push(houseServiceCategory[idx]);
		}
	});

	return (
		<Container>
			<AccomImg>
				<Img src={accomodation} />
				<OverHeartIcon>
					<HeartIcons favorite={true} />
				</OverHeartIcon>
			</AccomImg>
			<Info>
				<OneLine>
					<div>센텀 무지개 호텔</div>
					<HeartIcons favorite={true} />
				</OneLine>
				<RateBox>
					<Rating rate={rate} readonly />
				</RateBox>
				(후기 : {reviewCnt.toLocaleString()}개)
				<div>{location}</div>
				<div>
					입실 ~ 퇴실 : {startTime}시 ~ {endTime}시
				</div>
				<div>
					<div>
						시설 및 서비스
						<br />
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
