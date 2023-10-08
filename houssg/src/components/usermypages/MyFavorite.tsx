import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../common/Rating';
import { color } from '../../assets/styles';
import { MapMarker } from '../../assets/icons';
import HeartIcons from '../common/HeartIcons';

// TODO: 서버 > 찜목록
import api from '../../api/api';
import { userUrl } from '../../assets/constant/urlConst';

interface MyFavoriteList {
	favorites: {
		houseId: number;
		accomName: string;
		houseAddress: string;
		userId: string;
		rating: number;
		favorite: boolean;
	}[];
}

const MyFavorite: React.FC<MyFavoriteList> = ({ favorites }) => {
	const navigate = useNavigate();

	const [favorite, setFavorite] = useState(favorites);

	//TODO: id가 유저id인지??
	// const user = favorites[0].userId;

	//TODO: 403 error
	const myFavorite = async () => {
		try {
			const response = await api.post(userUrl.myFavorite);
			setFavorite(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		myFavorite();
		// TODO: 서버 연결 후 수정
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO: 서버 > 찜해제 (찜 컴퍼넌트에 하기)
	// const onMyFavorite = async () => {
	// 	try {
	// 		const response = await api.delete(userUrl.delFavorite, { houseId });
	// 		setFavorite(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return (
		<MyFavoriteWrapper>
			{favorite.length === 0 ? (
				<GrayFont>찜한 숙소가 없습니다.😢</GrayFont>
			) : (
				favorite.map((favoriteItem, index) => (
					<div key={index}>
						<MyFavoriteContainer>
							<HouseNameBox>
								<span
									onClick={() => {
										navigate(`/user/house/${favoriteItem.houseId}`);
									}}
								>
									{favoriteItem.accomName}
								</span>
							</HouseNameBox>
							<HouseRateBox>
								<Rating rate={favoriteItem.rating} readonly />
							</HouseRateBox>
							<HouseAddressBox>
								<img src={MapMarker} alt="Map Marker" />
								<div>{favoriteItem.houseAddress}</div>
							</HouseAddressBox>
							<FavoriteContainer>
								<HeartIcons favorite={favoriteItem.favorite} />
							</FavoriteContainer>
						</MyFavoriteContainer>
					</div>
				))
			)}
		</MyFavoriteWrapper>
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

	img {
		@media (max-width: 430px) {
			width: 4vw;
		}
	}

	img:hover {
		cursor: pointer;
	}
`;
