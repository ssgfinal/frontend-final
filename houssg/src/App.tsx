import { Main } from './pages';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</div>
	);
};

export default App;
