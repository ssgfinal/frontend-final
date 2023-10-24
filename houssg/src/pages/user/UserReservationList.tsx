import { styled } from 'styled-components';

import ReservationList from '../../components/reservation/ReservationList';
import { useQuery } from '@tanstack/react-query';
import { userKey } from '../../assets/constant/queryKey';
import { api } from '../../api';
import { userUrl } from '../../assets/constant';
import { ReservationsType } from '../../types';

const UserReservationList = () => {
	const getMyReservation = () => api.get(userUrl.myReservation);
	const { isLoading, data, isSuccess, isError } = useQuery<{ data: ReservationsType[] }>([userKey.myReservation], getMyReservation, {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
	});

	if (isError) {
		return <div>에러가 있습니다.</div>;
	}

	if (isLoading) {
		<div>로딩중입니다.</div>;
	}

	return (
		<div>
			<UserReservationContainer>
				{isSuccess &&
					(data.data.length === 0 ? (
						<div>예약 내역이 없습니다.</div>
					) : (
						data.data.map(
							(reservation) =>
								// 예약 중인 예약내역은 애초에 화면에 안 띄울거니까 status가 0인 애들은 안 보내야 맞는 거 아닌가?
								reservation.status !== 0 && (
									<div key={reservation.reservationNumber}>
										<ReservationList reservations={reservation} />
									</div>
								),
						)
					))}
			</UserReservationContainer>
		</div>
	);
};

export default UserReservationList;

const UserReservationContainer = styled.div`
	width: 90%;
	grid-area: a;
	display: grid;
	justify-content: center;
	margin: 3rem auto;

	@media (min-width: 1400px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
	}

	@media (min-width: 1200px) and (max-width: 1400px) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a a a';
	}

	@media (min-width: 700px) and (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'a a';
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
		grid-template-areas: 'a';
	}
`;
