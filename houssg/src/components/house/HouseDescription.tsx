import { styled } from 'styled-components';
import { color } from '../../assets/styles';
import React from 'react';

interface HouseDescriptionProps {
	houseDetail: string;
}
const HouseDescription: React.FC<HouseDescriptionProps> = ({ houseDetail }) => {
	return <Wrapper>{houseDetail}</Wrapper>;
};

const Wrapper = styled.div`
	margin: 1rem;
	padding: 2rem;
	white-space: pre-wrap;
	text-align: left;
	border-radius: 1rem;
	min-height: 15rem;
	line-height: 1.5rem;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default HouseDescription;
