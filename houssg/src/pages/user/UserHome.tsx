import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer, Header, Nav } from '../../layout';
import CommonModal from '../../components/common/CommonModal';
import { useState } from 'react';

const UserHome = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalChildren, setModalChildren] = useState<React.ReactNode>(<div></div>);
	return (
		<LayoutWrapper>
			<Header setIsModalOpen={setIsModalOpen} setModalChildren={setModalChildren} />
			<Nav />
			<Outlet />
			<CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
				{modalChildren}
			</CommonModal>
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
