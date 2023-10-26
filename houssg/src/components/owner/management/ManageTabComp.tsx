import React from 'react';

import { ManageReview, ManageRoomWrap } from '.';

const ManageTabComp: React.FC<{ accomNumber: number; isRoomSelected: number }> = ({ accomNumber, isRoomSelected }) => {
	return <div>{isRoomSelected === 1 ? <ManageRoomWrap accomNumber={accomNumber} /> : <ManageReview accomNumber={accomNumber} />}</div>;
};

export default ManageTabComp;
