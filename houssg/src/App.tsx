import { Routes, Route } from 'react-router-dom';
import './App.css';

import { Main } from './pages';
import { OwnerAuth, OwnerHome, OwnerMain, OwnerManagement, OwnerRegister } from './pages/owner';
import { UserHome, UserHouseList, UserMain, UserMypage, UserReservationList } from './pages/user';

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
			<Route path="/ownerAuth" element={<OwnerAuth />} />
			<Route path="/owner" element={<OwnerHome />}>
				<Route index element={<OwnerMain />} />
				<Route path="/owner/register" element={<OwnerRegister />} />
				<Route path="/owner/management" element={<OwnerManagement />} />
			</Route>
		</Routes>
	);
};

export default App;
