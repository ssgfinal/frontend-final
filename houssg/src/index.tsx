import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from './store/redux';
import { Provider } from 'react-redux';

import App from './App';
import { basicTheme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<ThemeProvider theme={basicTheme}>
		{/* <QueryClientProvider client={client}> */}
		<Provider store={store}>
			<BrowserRouter>
				<GlobalStyle />
				<App />
			</BrowserRouter>
		</Provider>
		{/* </QueryClientProvider> */}
	</ThemeProvider>,
);
