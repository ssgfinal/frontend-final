import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer, Header, Nav } from '../../layout';
import { CommonModal } from '../../components/common';

const UserHome = () => {
	return (
		<LayoutWrapper>
			<Header />
			<Nav />
			<Outlet />
			<CommonModal></CommonModal>
			<FooterPositioner />
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

const FooterPositioner = styled.div`
	width: 100%;
	height: 110px;
`;
