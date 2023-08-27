import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';

const router = createBrowserRouter([
	{
		// 전체 라우터들의 컨테이너
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: <Main />,
			},
		],
	},
]);

export default router;
