import { styled } from 'styled-components';
import { ManageNavProps, StyledActiveProps } from '../../../types';
import { HouseTabContainer, color } from '../../../assets/styles';

const ManageNav: React.FC<ManageNavProps> = ({ isRoomSelected, isOpenTabComp, setSelectedNav, setIsOpenTabComp }) => {
	const onNavHandler = (isRoomTab: number) => {
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
			<NavStateComp $active={isRoomSelected === 1 && isOpenTabComp} onClick={() => onNavHandler(1)}>
				객실 정보
			</NavStateComp>
			<NavStateComp $active={isRoomSelected === 2 && isOpenTabComp} onClick={() => onNavHandler(2)}>
				숙소 후기
			</NavStateComp>
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
	transition: color 0.18s;
	&:hover {
		color: ${color.color1};
	}
`;
