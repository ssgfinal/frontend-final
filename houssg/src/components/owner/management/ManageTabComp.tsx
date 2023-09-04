import React from 'react';

const ManageTabComp: React.FC<{ isRoomSelected: boolean }> = ({ isRoomSelected }) => {
	return <div>{isRoomSelected ? <div>룸</div> : <div>리뷰</div>}</div>;
};

export default ManageTabComp;
