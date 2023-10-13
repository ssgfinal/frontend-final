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
	border: solid ${color.color2};
	border-radius: 1rem;
	min-height: 15rem;
	line-height: 1.5rem;
`;

export default HouseDescription;
