import { FC } from 'react';
import { DateAvailComp, DateReserveComp } from './element';

const DateCalModalComp: FC<{ purposeType: string }> = ({ purposeType }) => {
	return (
		<>
			{purposeType === 'reserve' && <DateReserveComp />}
			{purposeType === 'available' && <DateAvailComp />}
		</>
	);
};

export default DateCalModalComp;
