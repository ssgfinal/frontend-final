import { Routes, Route } from 'react-router-dom';
import './App.css';

// TODO: OwnerAuth제거
import { OwnerHome, OwnerHouseRegister, OwnerIncome, OwnerMain, OwnerManagement, OwnerReservation } from './pages/owner';
import { UserHome, UserHouseList, UserMain, UserMypage, UserReservationList } from './pages/user';
import { UserHouseDetail } from './pages/user/UserHouseDetail';
import { UserReservation } from './pages/user/UserReservation';
import { ownerRoute, userRoute } from './assets/constant';

const App = () => {
	return (
		<Routes>
			<Route path={userRoute.main} element={<UserHome />}>
				<Route index element={<UserMain />} />
				<Route path={userRoute.houseList} element={<UserHouseList />} />
				<Route path={userRoute.houseDetail} element={<UserHouseDetail />} />
				<Route path={userRoute.myPage} element={<UserMypage />} />
				<Route path={userRoute.reservationList} element={<UserReservationList />} />
				<Route path={userRoute.reservation} element={<UserReservation />} />
			</Route>
			<Route path={ownerRoute.main} element={<OwnerHome />}>
				<Route index element={<OwnerMain />} />
				<Route path={ownerRoute.reservation} element={<OwnerReservation />} />
				<Route path={ownerRoute.register} element={<OwnerHouseRegister />} />
				<Route path={ownerRoute.management} element={<OwnerManagement />} />
				<Route path={ownerRoute.income} element={<OwnerIncome />} />
			</Route>
		</Routes>
	);
};

export default App;
