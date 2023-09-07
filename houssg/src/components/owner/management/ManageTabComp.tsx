import React from 'react';
import { ManageReview, ManageRoomWrap } from '.';

const ManageTabComp: React.FC<{ isRoomSelected: boolean }> = ({ isRoomSelected }) => {
	return <div>{isRoomSelected ? <ManageRoomWrap /> : <ManageReview />}</div>;
};

export default ManageTabComp;
