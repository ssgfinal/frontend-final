import styled from 'styled-components';
import { AddressFinder, BusinessRegi } from '../../components/owner/register';

const OwnerHouseRegister = () => {
	return (
		<RegisterWrapper>
			<BusinessRegi />
			<AddressFinder />
			<div>
				숙소 전화 번호 : <input />
			</div>
			<div>
				숙소 이미지 : <input />
			</div>
			<div>
				숙소 종류 : <input />
			</div>
			<div>
				서비스 및 시절 : <input />
			</div>
			<div>등록완료</div>
		</RegisterWrapper>
	);
};

export default OwnerHouseRegister;

const RegisterWrapper = styled.div`
	margin: 1rem auto;
`;
