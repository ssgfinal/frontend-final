import styled from 'styled-components';
import { AddressFinder, BusinessRegi, HouseImageRegi, HouseInfoRegi } from '../../components/owner/register';
import { houseServiceCategory } from '../../assets/constant';
import { useLocation, useNavigate } from 'react-router';

const OwnerHouseRegister = () => {
	const checkedList = new Array(houseServiceCategory.length).fill(0);
	const stepName = ['', 'address', 'image', 'info'];
	const navigate = useNavigate();
	const location = useLocation();
	const step = location.search.substring(1);

	const goStep = (stepName: string) => {
		navigate('/owner/register?' + stepName);
	};

	return (
		<RegisterWrapper>
			{step === stepName[0] && <BusinessRegi goStep={goStep} step={step} />}
			{step === stepName[1] && <AddressFinder goStep={goStep} step={step} />}
			{step === stepName[2] && <HouseImageRegi goStep={goStep} step={step} />}
			{step === stepName[3] && <HouseInfoRegi checkedList={checkedList} goStep={goStep} step={step} />}
			<div onClick={() => goStep('test')}>등록완료</div>
		</RegisterWrapper>
	);
};

export default OwnerHouseRegister;

const RegisterWrapper = styled.div`
	margin: 1rem auto;
`;
