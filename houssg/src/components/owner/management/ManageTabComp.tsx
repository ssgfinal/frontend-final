import React from 'react';
import { ManageRoomWrap } from '.';

const ManageTabComp: React.FC<{ isRoomSelected: boolean }> = ({ isRoomSelected }) => {
	return <div>{isRoomSelected ? <ManageRoomWrap /> : <div>리뷰</div>}</div>;
};

export default ManageTabComp;
