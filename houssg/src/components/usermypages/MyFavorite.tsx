import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { color } from '../../assets/styles';
import { MapMarker } from '../../assets/icons';
import HeartIcons from '../common/HeartIcons';
import Rating from '../common/Rating';

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
			{favorites.map((favoriteItem, index) => (
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
							<img src={MapMarker} />
							<div>{favoriteItem.houseAddress}</div>
						</HouseAddressBox>
						<FavoriteContainer>
							<HeartIcons favorite={favoriteItem.favorite} />
						</FavoriteContainer>
					</MyFavoriteContainer>
				</div>
			))}
		</MyFavoriteWrapper>
	);
};

export default MyFavorite;

const MyFavoriteWrapper = styled.div`
	margin: 1vw 1vw 1vw 1vw;
	padding: 1vw 1vw 1vw 1vw;
	justify-self: center;
`;

const MyFavoriteContainer = styled.div`
	width: 60vw;
	margin: 1vw 1vw 1vw 1vw;
	border-bottom: 1px solid ${color.unSelectColor};
	display: grid;
	grid-template-columns: 4fr 1fr;
	grid-template-rows: repeat(3, 1fr);
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
`;

const HouseRateBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 3;
	text-align: left;
	padding: 0 0 1vw 1vw;
`;

const HouseAddressBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
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
	}
`;

const FavoriteContainer = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 4;
	justify-self: right;
	align-self: start;
	padding: 1vw 1vw 0 0;
`;
