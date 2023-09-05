import { styled } from 'styled-components';
interface ManageNavProps {
	isRoomSelected: boolean;
	setSelectedNav: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenTabComp: boolean;
	setIsOpenTabComp: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageNav: React.FC<ManageNavProps> = ({ isRoomSelected, setSelectedNav, setIsOpenTabComp, isOpenTabComp, setIsEditMode }) => {
	console.log(isRoomSelected, isOpenTabComp, ' 선택과 오픈');

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
		<HouseInfoDetailNav>
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
		</HouseInfoDetailNav>
	);
};

export default ManageNav;

const HouseInfoDetailNav = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 0.5rem;
`;
