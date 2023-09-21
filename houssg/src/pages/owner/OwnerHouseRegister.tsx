import styled from 'styled-components';
import { useState } from 'react';
import { AddressFinder, BusinessRegi, HouseImageRegi, HouseInfoRegi } from '../../components/owner/register';

const OwnerHouseRegister = () => {
	// const stepName = ['bussiness', 'address', 'image', 'info'];

	const [step, setStep] = useState<number>(0);
	const goStep = (step: number) => {
		setStep(step);
	};

	return (
		<RegisterWrapper>
			{step === 0 && <BusinessRegi goStep={goStep} step={step} />}
			{step === 1 && <AddressFinder goStep={goStep} step={step} />}
			{step === 2 && <HouseImageRegi goStep={goStep} step={step} />}
			{step === 3 && <HouseInfoRegi goStep={goStep} step={step} />}
			<div onClick={() => goStep(0)}>등록완료</div>
		</RegisterWrapper>
	);
};

export default OwnerHouseRegister;

const RegisterWrapper = styled.div`
	margin: 1rem auto;
`;
