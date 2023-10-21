import { useAppSelector } from '../../../../hooks';
import { ownerHouseId, ownerHouseName } from '../../../../store/redux/calendarSlice';

const EventAvailComp = () => {
	const houseId = useAppSelector(ownerHouseId);
	const houseName = useAppSelector(ownerHouseName);
	console.log(houseId, houseName);
	//숙소넘버 숙소 아이디 고객번호 :"오프라인"
	return (
		<div>
			{/* 객실정보 객실이름, guest이름  	시작 끝일 */}
			<div>예약 숙소</div>
			<div>예약 시간</div>
			<div>예약자</div>
		</div>
	);
};

export default EventAvailComp;
