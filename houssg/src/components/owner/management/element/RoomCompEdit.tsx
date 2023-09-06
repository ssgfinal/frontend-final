import React from 'react';
import { SetStateToggle } from '../../../../types';

const RoomCompEdit: React.FC<SetStateToggle> = ({ setIsEditMode }) => {
	return (
		<div>
			RoomCompEdit
			<button
				onClick={() => {
					setIsEditMode(false);
				}}
			>
				수정 취소
			</button>
		</div>
	);
};

export default RoomCompEdit;
