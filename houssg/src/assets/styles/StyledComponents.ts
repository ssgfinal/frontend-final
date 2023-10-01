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
	@media screen and (max-width: 600px) {
		font-size: 1.7rem;
	}
`;

const AuthContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AuthFindingBtn = styled.div`
	margin: 0 0.5rem;
	font-size: 0.9rem;
	color: ${color.darkGrayColor};
	opacity: 0.5;
	&:hover {
		opacity: 1;
	}
	margin: 0.5rem 0;
	font-weight: 600;
	cursor: pointer;
	@media screen and (max-width: 400px) {
		font-size: 0.65rem;
	}
`;

const FinderRouteAligner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	gap: 1rem;
	margin: 0.8rem 0;
	@media screen and (max-width: 330px) {
		gap: 0.5rem;
	}
`;

const FindInputAligner = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	height: 100%;
	margin-top: 1rem;
	gap: 0.5rem;
`;

const CheckerContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background-color: red;
`;

const UseAbilitiyChecker = styled.button`
	position: absolute;
	padding: 0.3rem 0.5rem;
	right: calc(12% + 0.2rem);
	bottom: 0;
	transform: translateY(-40.5%);
	font-size: 0.7rem;
	color: ${color.backColor};
	background-color: ${color.color3};
	border-radius: 3px;
	border-color: transparent;
	cursor: pointer;
	opacity: 1;
	height: 1.7rem;
	justify-content: center;
	align-items: center;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	@media screen and (max-width: 1000px) {
		right: calc(10%);
	}

	@media screen and (max-width: 600px) {
		right: calc(6.2%);
	}
`;

//Manage관련

const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	margin: auto;

	@media screen and (max-width: ${devideOnce.first}) {
		flex-direction: column;
		align-items: start;
	}

	@media (max-width: 800px) {
		gap: 1rem;
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	gap: 0.3rem;
	padding: 0.5rem 0 0.5rem 0;
	justify-content: space-between;
	max-width: 30rem;
	width: 100%;
	margin: auto;

	@media (min-width: 800px) {
		padding: 0.5rem;
	}

	@media (max-width: 800px) {
		display: grid;
		grid-template-columns: 3fr 5fr;
		justify-content: left;
		align-items: center;
		padding: 0 1rem;
		margin: 0;
	}
`;

const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	width: 100%;
	max-width: 36rem;
	text-align: left;

	@media (min-width: 800px) {
		padding: 1rem;
	}

	@media (max-width: 800px) {
		margin: 0;
		padding: 0 1rem;
	}
`;

const InfoText = styled.div`
	font-size: 0.9rem;
	line-height: 1.3rem;
	padding-bottom: 2rem;
	white-space: pre-wrap;

	@media (max-width: 300px) {
		font-size: 0.5rem;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		font-size: 0.8rem;
	}
`;

const InfoTitleText = styled.span`
	font-size: 1rem;
	font-weight: bold;
	padding-bottom: 0.1rem;
	color: ${color.color1};

	@media (max-width: 300px) {
		font-size: 0.8rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 800px) {
		padding: 0.5rem 0 0.5rem 0;
		grid-column-start: 1;
		grid-column-end: 2;
		text-align: left;
		font-size: 1rem;
	}
`;

const HouseTabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin: 0.9rem 0;
`;

const NavClickComp = styled.div`
	padding: 0.5rem;
	color: ${color.basicColor};
	font-weight: 600;
	font-size: 0.8rem;
	cursor: pointer;
	&:hover {
		color: ${color.color1};
	}
`;

const ManageReadTitle = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;
	color: ${color.color1};
	margin-bottom: 0.8rem;

	@media (max-width: 300px) {
		font-size: 0.7rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 500px) {
		font-size: 1rem;
	}
`;

//OwnerRegi
const RegiHeadText = styled.div`
	margin-top: 0.5rem;
	font-size: 1.5rem;
	font-weight: bold;
	color: ${color.color1};
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
	margin: 1rem 0;
`;

//Auth
export { AuthContainer, AuthTitle, AuthFindingBtn, CheckerContainer, UseAbilitiyChecker, FinderRouteAligner, FindInputAligner };

export { HouseInfoContainer, HouseTabContainer, InfoWrapper, InfoText, InfoTitleText, SubInfoAligner, NavClickComp };

// 관리
export { ManageReadTitle };
// 등록
export { RegiHeadText, HouseRegiEachWrapper };
// common
export { SmallIndicatorText };

// 유저 예약
export { ReservationCommonBox, UserReservationTitle, UserReservationLeft };
