import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { basicTheme } from './assets/styles/theme';
import App from './App';
import GlobalStyle from './assets/styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ThemeProvider theme={basicTheme}>
		{/* <QueryClientProvider client={client}> */}
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
		{/* </QueryClientProvider> */}
	</ThemeProvider>,
);
