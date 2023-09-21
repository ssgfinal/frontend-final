import { useState } from 'react';
import { styled } from 'styled-components';

import { accomodation } from '../../assets/icons';
import Rating from '../common/Rating';

import { nosmoke, ott } from '../../assets/icons';
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

	return (
		<Container>
			<Img src={accomodation} />
			<Info>
				<div>숙소명</div>
				찜하기 컴포넌트
				<br />
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
							<Icon src={nosmoke} />
							<Icon src={ott} />

							<MoreService onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</MoreService>
						</Service>
					</div>
					{isDropdownOpen && (
						<DropdownContent>
							<p>더 많은 시설 및 서비스</p>
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
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
	}
	@media (max-width: 750px) {
		margin-bottom: 0;
		grid-template-columns: 1fr;
	}
`;
const Img = styled.img`
	width: 100%;
`;

const Info = styled.div`
	padding: 3rem 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1rem;
	text-align: left;
	align-items: center;
`;
const MoreService = styled.button`
	&:hover {
		cursor: pointer;
	}

	background-color: white;
	border-width: 0;
`;

const DropdownContent = styled.div`
	position: absolute;
`;

const Icon = styled.img`
	margin: 0.5rem;
	width: 1.5rem;
`;

const RateBox = styled.div`
	width: 30%;
`;
const Service = styled.div`
	display: flex;
`;
