import { Main } from './pages';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserHome from './pages/user/UserHome';
import OwernerHome from './pages/owner/OwnerHome';
import UserMain from './pages/user/UserMain';
import UserHouseList from './pages/user/UserHouseList';
import UserMypage from './pages/user/UserMypage';
import UserReservationList from './pages/user/UserReservationList';

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
