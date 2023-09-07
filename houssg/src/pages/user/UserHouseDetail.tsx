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

	const tabObj = [
		['description', '숙소 소개'],
		['roominfo', '객실 정보'],
		['review', '후기'],
	];

	const [clickTab, setClickTab] = useState<string>('description');

	return (
		<Wrapper>
			<HouseInfo />
			<div>
				<TabMenu tabObj={tabObj} clickTab={clickTab} setClickTab={setClickTab} />
				<div>{clickTab === 'description' ? <HouseDescription /> : clickTab === 'roominfo' ? <RoomList /> : <HouseReview />}</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 70vw;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
`;
