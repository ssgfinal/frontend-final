import { FC } from 'react';
import { EventAvailComp, EventReserveComp } from './element';

const EventCalModalComp: FC<{ purposeType: string }> = ({ purposeType }) => {
	return (
		<>
			{purposeType === 'reserve' && <EventReserveComp />}
			{purposeType === 'available' && <EventAvailComp />}
		</>
	);
};

export default EventCalModalComp;
