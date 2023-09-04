import React from 'react';
import { Rate } from 'antd';
import { styled } from 'styled-components';

interface Props {
	rate: number;
	readonly?: boolean;
}

const roundRate = (rate: number) => {
	return Math.round(rate);
};

const Rating: React.FC<Props> = ({ rate, readonly }) => (
	<Wrapper>
		<Rate allowHalf disabled={readonly} defaultValue={roundRate(rate)} style={{ width: '8.5rem' }} />
		{rate.toFixed(1)}
	</Wrapper>
);

const Wrapper = styled.div`
	width: 18rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`;
export default Rating;
