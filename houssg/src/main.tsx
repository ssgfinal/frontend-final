import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { basicTheme } from './assets/styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ThemeProvider theme={basicTheme}>
		{/* <QueryClientProvider client={client}> */}
		<RouterProvider router={Router} />
		{/* </QueryClientProvider> */}
	</ThemeProvider>,
);
