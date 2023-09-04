import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';

export const UserHouseDetail = () => {
	// 추후 쓸 변수
	// const { houseId } = useParams();

	const [clickTab, setClickTab] = useState<string>('roominfo');

	return (
		<Wrapper>
			<HouseInfo />
			<div>
				<TabMenu clickTab={clickTab} setClickTab={setClickTab} />
				<div>{clickTab === 'roominfo' ? <RoomList /> : clickTab === 'description' ? <HouseInfo /> : <HouseReview />}</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 80vw;
	margin: 0 auto;
`;
