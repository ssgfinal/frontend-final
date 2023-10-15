import { styled } from 'styled-components';

import ReservationList from '../../components/reservation/ReservationList';
import { useQuery } from '@tanstack/react-query';
import { userKey } from '../../assets/constant/queryKey';
import { api } from '../../api';
import { userUrl } from '../../assets/constant';
import { MyReservation } from '../../types';

const UserReservationList = () => {
	const getMyReservation = () => api.get(userUrl.myReservation);
	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MyReservation[] }>([userKey.myReservation], getMyReservation, {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
	});

	isSuccess && console.log(data);

	if (isError) {
		console.log(error);
		return <div>에러가 있습니다.</div>;
	}

	if (isLoading) {
		<div>로딩중입니다.</div>;
	}

	return (
		<UserReservationWrapper>
			<UserReservationContainer>
				{isSuccess &&
					(data.data.length === 0 ? (
						<div>없음</div>
					) : (
						data.data.map((reservation) => (
							<div key={reservation.reservationNumber}>
								<ReservationList reservations={reservation} />
							</div>
						))
					))}
			</UserReservationContainer>
		</UserReservationWrapper>
	);
};

export default UserReservationList;

const UserReservationWrapper = styled.div``;

const UserReservationContainer = styled.div`
	width: 80%;
	grid-area: a;
	display: grid;
	justify-content: center;
	margin: 1rem auto;
	grid-gap: 1rem;

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
