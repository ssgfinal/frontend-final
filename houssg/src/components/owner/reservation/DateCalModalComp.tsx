import { FC } from 'react';
import styled from 'styled-components';

const DateCalModalComp: FC<{ purposeType: string }> = ({ purposeType }) => {
	return (
		<>
			{purposeType === 'reserve' && <Container>날짜</Container>}
			{purposeType === 'available' && <Container>날짜</Container>}
		</>
	);
};

export default DateCalModalComp;

const Container = styled.div`
	display: flex;
`;
