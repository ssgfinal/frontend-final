import styled from 'styled-components';

import { color, devideOnce, flexCenter } from '.';

//Auth
const AuthTitle = styled.div`
	width: 100%;
	padding: 0.5rem;
	font-size: 2rem;
	font-weight: 800;
	color: ${color.color2};
	text-align: center;
	height: 4rem;
`;

const AuthContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

//Manage관련

const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	@media screen and (max-width: ${devideOnce.first}) {
		flex-direction: column;
		align-items: start;
	}
`;

const InfoWrapper = styled.div`
	/* margin-top: 0.6rem; */
	display: flex;
	flex-direction: column;
	text-align: left;
	gap: 0.3rem;
	padding: 0.5rem;
	justify-content: space-between;
	max-width: 30rem;
	width: 20vw;

	@media screen and (max-width: ${devideOnce.first}) {
		width: 80vw;
	}
`;

const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: column;
	width: 55vw;
	max-width: 40rem;
	text-align: left;
	@media screen and (max-width: ${devideOnce.first}) {
		max-width: 30rem;
		width: auto;
	}
`;

const InfoText = styled.div`
	font-size: 1rem;
	white-space: pre-wrap;
	line-height: 1.2rem;
	/* max-width: 800px; */
`;

const InfoTitleText = styled.span`
	font-size: 1.1rem;
	font-weight: 600;
	color: ${color.color1};
`;

const HouseTabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin: 0.9rem 0;
`;

const NavClickComp = styled.div`
	color: ${color.basicColor};
	font-weight: 600;
	font-size: 1rem;
	transition: color 0.8s;
	&:hover {
		color: ${color.color1};
	}
	cursor: pointer;
`;

const ManageReadTitle = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;
	color: ${color.color1};
	margin-bottom: 0.8rem;
`;

//common
const SmallIndicatorText = styled.div`
	margin: 0 0.5rem;
	font-size: 0.7rem;
	color: ${color.unSelectColor};
	margin: 0.5rem 0;
	font-weight: 600;
`;

// UserReservation.tsx

const ReservationCommonBox = styled.div`
	padding: 0.5rem 2rem 2rem 2rem;
	display: grid;
`;

const UserReservationTitle = styled.div`
	background-color: ${color.color2};
	color: white;
	margin-bottom: 2rem;
	padding: 0.5rem;
	font-weight: bold;
	border-radius: 1rem;
`;

const UserReservationLeft = styled.div`
	text-align: left;
	margin: 0.5rem 0;
`;

const HouseRegiEachWrapper = styled.div`
	${flexCenter}
	flex-direction: column;
	margin: 0.5rem 0;
`;

export { AuthContainer, AuthTitle };

export { HouseInfoContainer, HouseTabContainer, InfoWrapper, InfoText, InfoTitleText, SubInfoAligner, NavClickComp };

export { ManageReadTitle };

export { SmallIndicatorText };

export { ReservationCommonBox, UserReservationTitle, UserReservationLeft };

export { HouseRegiEachWrapper };
