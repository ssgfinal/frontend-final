import { useState } from 'react';
import { styled } from 'styled-components';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';
import { HouseDescription } from '../../components/house/HouseDescription';

export const UserHouseDetail = () => {
	const tabObj = [
		['description', '소개'],
		['roominfo', '객실'],
		['review', '후기'],
	];

	const [clickTab, setClickTab] = useState<string>('description');

	return (
		<Wrapper>
			<HouseInfo />
			<div>
				<Tab>
					<TabMenu tabObj={tabObj} clickTab={clickTab} setClickTab={setClickTab} />
				</Tab>
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

const Tab = styled.div`
	width: 100%;
	hr {
		width: 100%;
	}
`;
