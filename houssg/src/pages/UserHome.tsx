import { Outlet } from 'react-router-dom';
import { Footer, Header, Nav } from '../layout';
import styled from 'styled-components';
const UserHome = () => {
	return (
		<LayoutWrapper>
			<Header />
			<Nav />
			<Outlet />
			<Footer />
		</LayoutWrapper>
	);
};

export default UserHome;

const LayoutWrapper = styled.div`
	min-height: 100vh;
	position: relative;
	width: 100%;
`;
