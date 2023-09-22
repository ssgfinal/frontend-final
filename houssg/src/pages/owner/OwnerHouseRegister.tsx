import styled from 'styled-components';
// import { useState } from 'react';
import { AddressFinder, BusinessRegi, HouseImageRegi, HouseInfoRegi } from '../../components/owner/register';
import { useLocation, useNavigate } from 'react-router';
import useWindowWarning from '../../hooks/useWindowWarning';

const OwnerHouseRegister = () => {
	const navigate = useNavigate();

	useWindowWarning();
	const location = useLocation();
	const funnelState = location.state;

	const step = funnelState ? funnelState.step : 0;
	const goStep = (step: number, newState?: { [key: string]: string | number }) => {
		navigate('', { state: { ...funnelState, step, ...newState } });
	};

	return (
		<RegisterWrapper>
			{step === 0 && <BusinessRegi goStep={goStep} step={step} funnelState={funnelState} />}
			{step === 1 && <AddressFinder goStep={goStep} step={step} funnelState={funnelState} />}
			{step === 2 && <HouseImageRegi goStep={goStep} step={step} funnelState={funnelState} />}
			{step === 3 && <HouseInfoRegi goStep={goStep} step={step} funnelState={funnelState} />}
			<div onClick={() => goStep(0)}>등록완료</div>
		</RegisterWrapper>
	);
};

export default OwnerHouseRegister;

const RegisterWrapper = styled.div`
	margin: 1rem auto;
`;
