import { useParams } from 'react-router-dom';

const OwnerRoomRegister = () => {
	const { houseId } = useParams();

	return <div>방하이 {houseId}</div>;
};

export default OwnerRoomRegister;
