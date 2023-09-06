import React from 'react';
import { SetStateToggle } from '../../../../types';

const RoomCompRead: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	return (
		<div>
			RoomCompRead
			<button onClick={() => setIsEditMode(true)}>수정하기</button>
		</div>
	);
};

export default RoomCompRead;
