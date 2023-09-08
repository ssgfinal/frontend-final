import React from 'react';
import { ManageReview, ManageRoomWrap } from '.';

const ManageTabComp: React.FC<{ isRoomSelected: number }> = ({ isRoomSelected }) => {
	return <div>{isRoomSelected === 1 ? <ManageRoomWrap /> : <ManageReview />}</div>;
};

export default ManageTabComp;
