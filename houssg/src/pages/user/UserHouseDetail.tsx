import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { TabMenu } from '../../components/common/TabMenu';
import { HouseInfo } from '../../components/house/HouseInfo';
import { RoomList } from '../../components/house/RoomList';
import { HouseReview } from '../../components/house/HouseReview';

export const UserHouseDetail = () => {
	const { houseId } = useParams();

	const [clickTab, setClickTab] = useState<string>('info');

	return (
		<div>
			UserHouseDetail {houseId}
			<br />
			숙소명 &nbsp; 찜하기 컴포넌트
			<br />
			숙소 이미지
			<br />
			평점 <br />
			위치 <br />
			시설 및 서비스 더보기 라이브러리 <br />
			<div>
				<TabMenu clickTab={clickTab} setClickTab={setClickTab} />
				<div>{clickTab === 'info' ? <RoomList /> : clickTab === 'description' ? <HouseInfo /> : <HouseReview />}</div>
			</div>
		</div>
	);
};
