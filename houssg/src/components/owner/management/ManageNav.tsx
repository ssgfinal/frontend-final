import { styled } from 'styled-components';
import { ManageNavProps, StyledActiveProps } from '../../../types';
import { HouseTabContainer, NavClickComp, color } from '../../../assets/styles';

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
			<NavStateComp $active={isRoomSelected} onClick={() => onNavHandler(true)}>
				객실 정보 {isRoomSelected && isOpenTabComp && '닫기'}
			</NavStateComp>
			<NavStateComp $active={!isRoomSelected} onClick={() => onNavHandler(false)}>
				리뷰 확인 {!isRoomSelected && isOpenTabComp && '닫기'}
			</NavStateComp>
			<NavClickComp>객실 추가하기</NavClickComp>
			<NavClickComp
				onClick={() => {
					setIsEditMode(true);
					setIsOpenTabComp(false);
				}}
			>
				수정 및 삭제
			</NavClickComp>
		</HouseTabContainer>
	);
};

export default ManageNav;

const NavStateComp = styled.div<StyledActiveProps>`
	color: ${({ $active }) => ($active ? color.color1 : color.unSelectColor)};
	font-size: ${({ $active }) => ($active ? '1.1rem' : '1rem')};

	font-weight: ${({ $active }) => ($active ? 800 : 600)};
	cursor: pointer;
	border-color: ${({ $active }) => ($active ? color.color1 : color.unSelectColor)};
	/* border-collapse: collapse; */
`;
