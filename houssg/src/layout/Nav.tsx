import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useLocation 추가
import { color } from '../assets/styles/theme';
import { useIsUser, usePathname } from '../hooks';
import { StyledActiveProps } from '../types';
import { devideOnce } from '../assets/styles';

const Nav = () => {
	const navigate = useNavigate();
	const pathname = usePathname();
	const isUser = useIsUser();

	const userNav = [
		['홈', '/user'],
		['숙소', '/user/house'],
		['예약내역', '/user/reservation'],
		['마이페이지', '/user/mypage'],
	];
	const ownerNav = [
		['홈', '/owner'],
		['내 숙소', '/owner/management'],
		['예약 확인', '/owner/reservation'],
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
