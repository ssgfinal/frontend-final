import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';
import { HouseBaseInfo } from '../../types';
import HouseDescription from '../../components/house/HouseDescription';

const UserHouseDetail = () => {
	const tabObj = [
		['description', '소개'],
		['roominfo', '객실'],
		['review', '후기'],
	];

	const { houseId } = useParams();
	const [house, setHouse] = useState<HouseBaseInfo>();

	const [clickTab, setClickTab] = useState<string>('roominfo');

	useEffect(() => {
		try {
			api.get(userUrl.houseDetail, { params: { accomNumber: houseId } }).then(({ data }) => {
				setHouse(data);
			});
		} catch (error) {
			console.error('데이터를 불러오는데 실패했습니다.', error);
		}
	}, []);

	return (
		<Wrapper>
			{house && (
				<>
					<HouseInfo house={house} />
					<div>
						<Tab>
							<TabMenu tabObj={tabObj} clickTab={clickTab} setClickTab={setClickTab} />
						</Tab>
						<div>
							{clickTab === 'description' ? (
								<HouseDescription houseDetail={house.accomDetails} />
							) : clickTab === 'roominfo' ? (
								<RoomList houseName={house.accomName} />
							) : (
								<HouseReview />
							)}
						</div>
					</div>
				</>
			)}
		</Wrapper>
	);
};

export default UserHouseDetail;

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
