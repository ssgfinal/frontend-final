import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useLocation 추가
import { color } from '../assets/styles/theme';
import { useIsUser, usePathname } from '../hooks';

interface NavTextProps {
	$active: boolean; // active 속성의 타입을 지정
}

const Nav = () => {
	const navigate = useNavigate();
	const pathname = usePathname();
	const isUser = useIsUser();

	const userNav = [
		['홈', '/user'],
		['숙박업소', '/user/house'],
		['예약내역', '/user/reservation'],
		['마이페이지', '/user/mypage'],
	];
	const ownerNav = [
		['홈', '/owner'],
		['숙소 등록', '/owner/register'],
		['숙소 관리', '/owner/management'],
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

const NavText = styled.div<NavTextProps>`
	font-size: ${({ $active }) => ($active ? '1.3rem' : '1rem')};
	font-weight: ${({ $active }) => ($active ? 800 : 500)};
	color: ${color.backColor};
	cursor: pointer;
	@media only screen and (max-width: 765px) {
		font-size: ${({ $active }) => ($active ? '1.1rem' : '0.8rem')};
	}
`;
