import { useState } from 'react';
import { styled } from 'styled-components';

import { accomodation } from '../../assets/icons';
import Rating from '../common/Rating';

export const HouseInfo = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const rate = 3.4;
	const location = '부산시 수영구 수영동';
	const reviewCnt = 11400;

	// 숫자를 1000 단위로 포맷하는 함수
	const formatNumber = (value: number) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<Container>
			<Img src={accomodation} />
			<Info>
				<div>숙소명</div>
				찜하기 컴포넌트
				<br />
				<Rating rate={rate} readonly />
				(후기 : {formatNumber(reviewCnt)}개)
				<div>{location}</div>
				<div>
					<div>
						시설 및 서비스 더보기
						<MoreService onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</MoreService>
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
	@media (min-width: 750px) {
		width: 40vw;
	}
	@media (max-width: 750px) {
		width: 68vw;
	}
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
	background-color: white;
	border-width: 0;
`;

const DropdownContent = styled.div`
	position: absolute;
`;
