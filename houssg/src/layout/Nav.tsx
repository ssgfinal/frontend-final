import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useLocation 추가
import { color } from '../assets/styles/theme';
import { useIsUser, usePathname } from '../hooks';
import { StyledActiveProps } from '../types';
import { devideOnce } from '../assets/styles';
import { ownerRoute, userRoute } from '../assets/constant';

const Nav = () => {
	const navigate = useNavigate();
	const pathname = usePathname();
	const isUser = useIsUser();

	const userNav = [
		['홈', userRoute.main],
		['숙소', userRoute.houseList],
		['예약내역', userRoute.reservationList],
		['마이페이지', userRoute.myPage],
	];
	const ownerNav = [
		['홈', ownerRoute.main],
		['내 숙소', ownerRoute.management],
		['예약 확인', ownerRoute.reservation],
		['정산 내역', ownerRoute.income],
	];

	const currentNav = isUser ? userNav : ownerNav;

	return (
		<NavContainer>
			{currentNav.map((nav, i) => (
				<NavText key={i} onClick={() => navigate(nav[1])} $active={pathname === nav[1]}>
					{nav[0]}
				</NavText>
			))}
		</NavContainer>
	);
};

export default Nav;

const NavContainer = styled.div`
	height: 4.5rem;
	background-color: ${color.color1};
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const NavText = styled.div<StyledActiveProps>`
	font-size: ${({ $active }) => ($active ? '1.2rem' : '1rem')};
	font-weight: ${({ $active }) => ($active ? 800 : 500)};
	color: ${color.backColor};
	cursor: pointer;
	@media only screen and (max-width: ${devideOnce.first}-35) {
		font-size: ${({ $active }) => ($active ? '1.1rem' : '0.8rem')};
	}
`;
