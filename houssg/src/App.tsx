import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react';
import { RouteWrap } from './layout';
import { OwnerHouseRegister, OwnerIncome, OwnerManagement, OwnerReservation, OwnerRoomRegister } from './pages/owner';
import { UserHouseList, UserMain, UserMypage, UserReservationList } from './pages/user';
import UserHouseDetail from './pages/user/UserHouseDetail';
import { UserReservation } from './pages/user/UserReservation';
import { ownerRoute, userRoute } from './assets/constant';
import { useAppDispatch, useLogin, usePathname } from './hooks';
import { openModal } from './store/redux/modalSlice';
import { isLoginFunc } from './utils';

const App = () => {
	const pathname = usePathname();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// session에 값 존재시 로그인하기 (아니면 로그아웃)
	useLogin();
	//로그인 없을 시 로그인 시키기
	useEffect(() => {
		const isLogin = isLoginFunc();

		if (!isLogin && pathname !== userRoute.main && !pathname.startsWith(userRoute.houseList)) {
			alert('로그인이 필요합니다');
			navigate('/');
			const modalSize = window.innerWidth >= 1000 ? 500 : 400;
			dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
		}
	}, [pathname, navigate, dispatch]);

	return (
		<Routes>
			<Route path={userRoute.main} element={<RouteWrap />}>
				<Route index element={<UserMain />} />
				<Route path={userRoute.houseList} element={<UserHouseList />} />
				<Route path={userRoute.houseDetail + ':houseId'} element={<UserHouseDetail />} />

				<Route path={userRoute.myPage} element={<UserMypage />} />
				<Route path={userRoute.reservationList} element={<UserReservationList />} />
				<Route path={userRoute.reservation + ':roomId'} element={<UserReservation />} />

				<Route path={ownerRoute.reservation} element={<OwnerReservation />} />
				<Route path={ownerRoute.register} element={<OwnerHouseRegister />} />
				<Route path={ownerRoute.management} element={<OwnerManagement />} />
				<Route path={ownerRoute.roomRegi + ':houseId'} element={<OwnerRoomRegister />} />
				<Route path={ownerRoute.income} element={<OwnerIncome />} />
			</Route>
		</Routes>
	);
};

export default App;
