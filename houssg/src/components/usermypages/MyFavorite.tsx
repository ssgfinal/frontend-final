import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { userKey } from '../../assets/constant/queryKey';
import { MyFavoriteList } from '../../types';
import { getMyFavoriteList } from '../../helper';
import Rating from '../common/Rating';

import { color } from '../../assets/styles';
import { MapMarker } from '../../assets/icons';
import HeartIcons from '../common/HeartIcons';

const MyFavorite = () => {
	const navigate = useNavigate();

	const { isLoading, data, isSuccess, isError, error } = useQuery<{ data: MyFavoriteList[] }>([userKey.myFavorite], () => getMyFavoriteList(), {
		cacheTime: 5 * 60 * 1000,
		staleTime: 2 * 60 * 1000,
		retry: 2,
	});

	isError && console.log(error, 'error');

	if (isLoading) {
		return <div>로딩중...</div>;
	}
	return (
		isSuccess && (
			<MyFavoriteWrapper>
				{data.data.length !== 0 ? (
					<>
						{data.data.map((favorites) => (
							<div key={favorites.accomNumber}>
								<MyFavoriteContainer>
									<HouseNameBox>
										<span
											onClick={() => {
												navigate(`/user/houseDetail/${favorites.accomNumber}`);
											}}
										>
											{favorites.accomName}
										</span>
									</HouseNameBox>
									<HouseRateBox>{favorites.avgRating !== undefined && <Rating rate={favorites.avgRating} readonly />}</HouseRateBox>
									<HouseAddressBox>
										<img src={MapMarker} alt="Map Marker" />
										<div>{favorites.accomAddress}</div>
									</HouseAddressBox>
									<FavoriteContainer>
										<HeartIcons houseId={favorites.accomNumber} beforePage="myFavorite" />
									</FavoriteContainer>
								</MyFavoriteContainer>
							</div>
						))}
					</>
				) : (
					<GrayFont>찜한 숙소가 없습니다.😢</GrayFont>
				)}
			</MyFavoriteWrapper>
		)
	);
};

export default MyFavorite;

const MyFavoriteWrapper = styled.div`
	width: 100%;
	margin: 2vw 5vw;
	padding: 0 5vw;
	justify-self: center;
`;

const GrayFont = styled.div`
	color: ${color.darkGrayColor};
	line-height: 5rem;
`;

const MyFavoriteContainer = styled.div`
	margin: 1rem;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 4fr 1fr;
`;

const HouseNameBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 2;
	text-align: left;
	font-size: 1.1rem;
	font-weight: 600;
	padding: 1vw 0 1vw 1vw;

	span:hover {
		cursor: pointer;
		color: ${color.color1};
	}

	@media (max-width: 900px) {
		font-size: 1rem;
	}
`;

const HouseRateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	width: 50%;
	padding: 0 0 1.5vw 1vw;

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.7rem;
	}

	ul {
		@media (max-width: 430px) {
			font-size: 0.8rem;
		}

		@media (max-width: 320px) {
			font-size: 0.7rem;
		}
	}
`;

const HouseAddressBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	color: ${color.darkGrayColor};
	text-align: left;
	padding: 0 0 2vw 1vw;
	font-size: 0.7rem;
	display: grid;
	grid-template-columns: 1fr 30fr;

	img {
		width: 0.6rem;
		margin: 0 auto;

		@media (max-width: 900px) {
			width: 0.6rem;
		}

		@media (max-width: 430px) {
			width: 0.5rem;
		}
	}

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}
`;

const FavoriteContainer = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	justify-self: right;
	align-self: start;
	padding: 1vw 1vw 0 0;
	width: 4vw;

	img {
		@media (max-width: 430px) {
			width: 1rem;
		}
	}

	img:hover {
		cursor: pointer;
	}
`;
