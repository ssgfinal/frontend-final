import React from 'react';
import { Rate } from 'antd';
import { styled } from 'styled-components';

interface Props {
	readonly?: boolean;
	rate: number;
	setRate?: React.Dispatch<React.SetStateAction<number>>;
}

const Rating: React.FC<Props> = ({ readonly, rate = 0, setRate }) => {
	const roundRate = (rate: number) => {
		return Math.round(rate * 2) / 2;
	};

	const handleRate = (rate: number) => {
		if (setRate) {
			setRate(rate);
		}
	};

	return (
		<Wrapper>
			{readonly ? (
				<Rate allowHalf disabled={readonly} value={roundRate(rate)} style={{ width: '8.5rem' }} />
			) : (
				<Rate allowHalf style={{ width: '8.5rem' }} onChange={(num) => handleRate(num)} />
			)}

			{rate.toFixed(1)}
		</Wrapper>
	);
};

export default Rating;

const Wrapper = styled.div`
	width: 18vw;
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
`;
