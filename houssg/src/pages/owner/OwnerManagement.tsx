import styled from 'styled-components';
import { ManageWrapComp } from '../../components/owner/management';
import { color } from '../../assets/styles';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyHouseListData } from '../../helper';
import { MyHouseData } from '../../types';

const OwnerManagement = () => {
	const navigate = useNavigate();
	// const houseList = [1, 2];

	const onHouseRegistering = () => {
		navigate('/owner/register');
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MyHouseData[] }>(['houseList'], getMyHouseListData, {
		cacheTime: 5 * 60 * 1000, // 5분
		staleTime: 2 * 60 * 1000, // 2분
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<ManagementWrapper>
			<HouserRegisterButton onClick={onHouseRegistering}>숙소 등록하기</HouserRegisterButton>

			<HouseList>{isSuccess && data.data.map((house) => <ManageWrapComp key={house.accomNumber} />)}</HouseList>
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
