import React from 'react';
import { Rate } from 'antd';

interface Props {
	rate: number;
	readonly?: boolean;
}

const roundRate = (rate: number) => {
	return Math.round(rate);
};

const Rating: React.FC<Props> = ({ rate, readonly }) => (
	<>
		<Rate allowHalf disabled={readonly} defaultValue={roundRate(rate)} />
		&nbsp;{rate.toFixed(1)}
	</>
);

export default Rating;
