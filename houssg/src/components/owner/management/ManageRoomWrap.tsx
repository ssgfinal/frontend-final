import { useState } from 'react';
import { RoomCompEdit, RoomCompRead } from './element';

const ManageRoomWrap = () => {
	const [isEditMode, setIsEditMode] = useState(false);

	return <div>{!isEditMode ? <RoomCompRead setIsEditMode={setIsEditMode} /> : <RoomCompEdit setIsEditMode={setIsEditMode} />}</div>;
};

export default ManageRoomWrap;
