import React, { Fragment } from 'react';
import { Outlet } from 'react-router';
import Layout from './assets/styles/Layout';
import GlobalStyle from './assets/styles/globalStyle';

const Root = () => {
	return (
		<Fragment>
			<GlobalStyle />
			<Layout>
				<Outlet />
			</Layout>
		</Fragment>
	);
};

export default Root;
