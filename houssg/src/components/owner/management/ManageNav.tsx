import { ManageNavProps } from '../../../types';
import { HouseTabContainer } from '../../../assets/styles';

const ManageNav: React.FC<ManageNavProps> = ({ isRoomSelected, setSelectedNav, setIsOpenTabComp, isOpenTabComp, setIsEditMode }) => {
	const onNavHandler = (isRoomTab: boolean) => {
		if (isRoomSelected === isRoomTab && isOpenTabComp) {
			setIsOpenTabComp(false);
		}
		// 탭이 닫혔으면 열기
		if (!isOpenTabComp) {
			setIsOpenTabComp(true);
		}

		setSelectedNav(isRoomTab);
	};

	return (
		<HouseTabContainer>
			<div onClick={() => onNavHandler(true)}>객실 정보 {isRoomSelected && isOpenTabComp && '닫기'}</div>
			<div onClick={() => onNavHandler(false)}>리뷰 확인 {!isRoomSelected && isOpenTabComp && '닫기'}</div>
			<div>객실 추가하기</div>
			<div
				onClick={() => {
					setIsEditMode(true);
					setIsOpenTabComp(false);
				}}
			>
				수정 및 삭제
			</div>
		</HouseTabContainer>
	);
};

export default ManageNav;
