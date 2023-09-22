import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from './store/redux';
import { Provider } from 'react-redux';

import App from './App';
import { basicTheme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

root.render(
	<ThemeProvider theme={basicTheme}>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<Provider store={store}>
				<BrowserRouter>
					<GlobalStyle />
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	</ThemeProvider>,
);
