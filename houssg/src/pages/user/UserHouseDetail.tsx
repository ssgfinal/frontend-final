import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';
import { HouseDescription } from '../../components/house/HouseDescription';

export const UserHouseDetail = () => {
	// 추후 쓸 변수
	// const { houseId } = useParams();

	const [clickTab, setClickTab] = useState<string>('roominfo');

	return (
		<Wrapper>
			<HouseInfo />
			<div>
				<TabMenu clickTab={clickTab} setClickTab={setClickTab} />
				<div>{clickTab === 'info' ? <RoomList /> : clickTab === 'description' ? <HouseDescription /> : <HouseReview />}</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 80vw;
	margin: 0 auto;
`;
