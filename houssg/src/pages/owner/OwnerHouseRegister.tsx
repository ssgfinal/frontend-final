import styled from 'styled-components';
import { AddressFinder, BusinessRegi, HouseImageRegi, HouseInfoRegi } from '../../components/owner/register';

const OwnerHouseRegister = () => {
	return (
		<RegisterWrapper>
			<BusinessRegi />
			<AddressFinder />
			<HouseImageRegi />
			<HouseInfoRegi />

			<div>등록완료</div>
		</RegisterWrapper>
	);
};

export default OwnerHouseRegister;

const RegisterWrapper = styled.div`
	margin: 1rem auto;
`;
