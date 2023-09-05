import styled from 'styled-components';

import { color, devideOnce, devideTwice } from '.';

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
		align-items: center;
		padding-top: 1rem;
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
`;

const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4vw;

	@media screen and (max-width: ${devideTwice.first}) {
		gap: 3vw;
	}
	@media screen and (max-width: ${devideTwice.second}) {
		gap: 2vw;
	}
`;

const InfoText = styled.div`
	font-size: 1rem;
	white-space: pre-wrap;
	line-height: 1.2rem;
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
	color: ${color.unSelectColor};
	font-weight: 600;
	font-size: 1rem;
	transition: color 0.8s;
	&:hover {
		color: ${color.color1};
	}
	cursor: pointer;
`;
export { AuthContainer, AuthTitle };

export { HouseInfoContainer, HouseTabContainer, InfoWrapper, InfoText, InfoTitleText, SubInfoAligner, NavClickComp };
