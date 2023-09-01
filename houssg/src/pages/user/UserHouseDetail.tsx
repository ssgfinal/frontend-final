import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { accomodation } from '../../assets/icons';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';
import Rating from '../../components/common/Rating';
import { styled } from 'styled-components';

export const UserHouseDetail = () => {
	const { houseId } = useParams();

	const [clickTab, setClickTab] = useState<string>('info');
	const rate = 3.4;
	const location = '부산시 수영구 수영동';

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<>
			UserHouseDetail {houseId}
			<br />
			<br />
			<img src={accomodation} />
			<Wrapper>
				<div>숙소명</div>
				찜하기 컴포넌트
				<br />
				<Rating rate={rate} readonly />
				<br />
				{location} <br />
				시설 및 서비스 더보기 라이브러리 <br />
				<div>
					<div>
						시설 및 서비스 더보기
						<MoreService onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</MoreService>
					</div>
					{isDropdownOpen && (
						<div>
							<p>더 많은 시설 및 서비스</p>
						</div>
					)}
				</div>
			</Wrapper>
			<div>
				<TabMenu clickTab={clickTab} setClickTab={setClickTab} />
				<div>{clickTab === 'info' ? <RoomList /> : clickTab === 'description' ? <HouseInfo /> : <HouseReview />}</div>
			</div>
		</>
	);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1rem;
	/* justify-items: left; */
`;
const MoreService = styled.button`
	background-color: white;
	border-width: 0;
`;
