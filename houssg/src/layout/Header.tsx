import styled from 'styled-components';

const Header = () => {
	return (
		<HeaderContainer>
			<div>logo</div>
			<div>로그인</div>
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.header`
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding-inline: 1rem;
`;
