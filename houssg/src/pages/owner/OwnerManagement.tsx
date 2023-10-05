import styled from 'styled-components';
import { ManageWrapComp } from '../../components/owner/management';
import { color } from '../../assets/styles';
import { useNavigate } from 'react-router-dom';
import { ownerUrl } from '../../assets/constant';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';

const OwnerManagement = () => {
	const navigate = useNavigate();
	const houseList = [1, 2];

	const onHouseRegistering = () => {
		navigate('/owner/register');
	};

	const getHouseListData = async () => {
		return await api.get(ownerUrl.myHouseList);
	};
	const { data, isLoading } = useQuery(['houseList'], getHouseListData);
	console.log(data, isLoading);
	return (
		<ManagementWrapper>
			<HouserRegisterButton onClick={onHouseRegistering}>숙소 등록하기</HouserRegisterButton>

			<HouseList>
				{houseList.map((_detail, index) => (
					<ManageWrapComp key={index} />
				))}
			</HouseList>
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

const HouserRegisterButton = styled.div`
	margin: 1rem 0;
	cursor: pointer;
	color: ${color.color1};
	font-weight: 600;
`;
