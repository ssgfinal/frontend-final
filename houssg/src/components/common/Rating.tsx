import React from 'react';
import { Rate } from 'antd';
import { styled } from 'styled-components';

interface Props {
	readonly?: boolean;
	rate: number;
	setRate?: React.Dispatch<React.SetStateAction<number>>;
}

// rate =0 으로 값을 주니 readonly일 때 props로 넘겨받은 평점으로 안 뜸
const Rating: React.FC<Props> = ({ readonly, rate, setRate }) => {
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
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
`;
