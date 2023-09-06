import { useState } from 'react';
import { RoomCompEdit, RoomCompRead } from '.';
import { RoomData } from '../../../../types/manage';

const RoomCompToggler: React.FC<RoomData> = ({ room }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	return (
		<div>{!isEditMode ? <RoomCompRead room={room} setIsEditMode={setIsEditMode} /> : <RoomCompEdit room={room} setIsEditMode={setIsEditMode} />}</div>
	);
};

export default RoomCompToggler;
