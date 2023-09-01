import { useParams } from 'react-router-dom';

export const RoomList = () => {
	const { houseId } = useParams();

	return (
		<div>
			RoomList
			<br />
			하우스 번호 : {houseId}{' '}
		</div>
	);
};
