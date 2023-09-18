import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Rating from '../common/Rating';
import { color } from '../../assets/styles';
import { MapMarker } from '../../assets/icons';
import HeartIcons from '../common/HeartIcons';

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

	return (
		<MyFavoriteWrapper>
			{favorites.length === 0 ? (
				<GrayFont>찜한 숙소가 없습니다.😢</GrayFont>
			) : (
				favorites.map((favoriteItem, index) => (
					<div key={index}>
						<MyFavoriteContainer>
							<HouseNameBox
								onClick={() => {
									navigate(`/user/house/${favoriteItem.houseId}`);
								}}
							>
								{favoriteItem.accomName}
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
	margin: 1vw 1vw 1vw 1vw;
	padding: 1vw 1vw 1vw 1vw;
	justify-self: center;
`;

const GrayFont = styled.div`
	color: ${color.darkGrayColor};
	line-height: 5rem;
`;

const MyFavoriteContainer = styled.div`
	margin: 1vw 1vw 1vw 1vw;
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
	font-size: 1.2rem;
	font-weight: 600;
	padding: 1vw 0 1vw 1vw;

	&:hover {
		cursor: pointer;
		color: ${color.color1};
	}

	@media (max-width: 900px) {
		font-size: 1rem;
	}

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}

	@media (max-width: 320px) {
		font-size: 0.5rem;
	}
`;

const HouseRateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	padding: 0 0 1vw 1vw;

	ul {
		@media (max-width: 430px) {
			margin-right: -7vw;
			font-size: 0.8rem;
		}

		@media (max-width: 320px) {
			margin-right: -15vw;
			font-size: 0.7rem;
		}

		@media (max-width: 240px) {
			margin-right: -30vw;
			font-size: 0.3rem;
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
	padding: 0 0 1vw 1vw;
	font-size: 0.8rem;
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

		@media (max-width: 320px) {
			width: 0.4rem;
		}
	}

	@media (max-width: 900px) {
		font-size: 0.5rem;
	}

	@media (max-width: 430px) {
		font-size: 0.3rem;
	}

	@media (max-width: 320px) {
		font-size: 0.1rem;
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
`;
