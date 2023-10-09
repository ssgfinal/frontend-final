// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { color } from '../../assets/styles';
import { useLocation } from 'react-router-dom';

export const HouseDescription = () => {
	const location = useLocation();
	const house = location.state.house;

	return (
		<Wrapper>
			{/* 하우스 번호 : {houseId}{' '} */}
			{house.accomDetails}
		</Wrapper>
	);
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
