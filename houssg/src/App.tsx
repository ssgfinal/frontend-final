import { Main } from './pages';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserHome from './pages/UserHome';
import OwernerHome from './pages/OwernerHome';
import UserMain from './pages/UserMain';
import UserHouseList from './pages/UserHouseList';
import UserMypage from './pages/UserMypage';
import UserReservationList from './pages/UserReservationList';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/user" element={<UserHome />}>
				<Route index element={<UserMain />} />
				<Route path="/user/house" element={<UserHouseList />} />
				<Route path="/user/mypage" element={<UserMypage />} />
				<Route path="/user/reservation" element={<UserReservationList />} />
			</Route>
			<Route path="/owner" element={<OwernerHome />} />
		</Routes>
	);
};

export default App;
