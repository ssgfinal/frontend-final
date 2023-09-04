import styled from 'styled-components';
import { MyHouseInfo } from '../../components/owner/management';

const OwnerManagement = () => {
	const houseList = [1, 2];
	return (
		<ManagementWrapper>
			<HouseList>
				{houseList.map((detail, index) => (
					<MyHouseInfo key={index} />
				))}
			</HouseList>
			<div>숙소 등록하기</div>
		</ManagementWrapper>
	);
};

export default OwnerManagement;

const ManagementWrapper = styled.div`
	margin: 0 auto;
	width: 97%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HouseList = styled.div``;
