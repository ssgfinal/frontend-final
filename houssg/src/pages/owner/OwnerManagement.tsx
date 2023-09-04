import styled from 'styled-components';
import { ManageWrapComp } from '../../components/owner/management';

const OwnerManagement = () => {
	const houseList = [1, 2];
	return (
		<ManagementWrapper>
			<HouseList>
				{houseList.map((_detail, index) => (
					<ManageWrapComp key={index} />
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
	margin-bottom: 1.5rem;
`;

const HouseList = styled.div``;
