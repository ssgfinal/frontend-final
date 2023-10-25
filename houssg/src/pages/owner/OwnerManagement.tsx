import styled from 'styled-components';
import { ManageWrapComp } from '../../components/owner/management';
import { color } from '../../assets/styles';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyHouseListData } from '../../helper';
import { MyHouseData } from '../../types';
import { ownerKey, ownerRoute } from '../../assets/constant';

const OwnerManagement = () => {
	const navigate = useNavigate();

	const onHouseRegistering = () => {
		navigate(ownerRoute.register);
	};

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MyHouseData[] }>([ownerKey.myHouseList], getMyHouseListData, {
		cacheTime: 4 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}

	return (
		<ManagementWrapper>
			<HouserRegisterButton onClick={onHouseRegistering}>숙소 등록하기</HouserRegisterButton>

			{isSuccess && data.data.map((house) => house.deletionRequest !== 2 && <ManageWrapComp house={house} key={house.accomNumber} />)}
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

const HouserRegisterButton = styled.div`
	margin: 1rem 0;
	cursor: pointer;
	color: ${color.color1};
	font-weight: 600;
`;
