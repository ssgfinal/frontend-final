import styled from 'styled-components';

import { color } from '.';

//Auth
export const AuthTitle = styled.div`
	width: 100%;
	padding: 0.5rem;
	font-size: 2rem;
	font-weight: 800;
	color: ${color.color2};
	text-align: center;
	height: 4rem;
`;

export const AuthContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

//Manage관련

export const HouseInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
`;

export const InfoWrapper = styled.div`
	/* margin-top: 0.6rem; */
	display: flex;
	flex-direction: column;
	text-align: left;
	gap: 0.3rem;
	padding: 0.5rem;
	justify-content: space-between;
	max-width: 30rem;
`;

export const SubInfoAligner = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5vw;
`;

export const InfoText = styled.div`
	font-size: 1rem;
	white-space: pre-wrap;
`;

export const HouseTabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 0.5rem;
`;
