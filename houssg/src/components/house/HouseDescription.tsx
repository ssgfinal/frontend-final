import React from 'react';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

export const HouseDescription = () => {
	// const { houseId } = useParams();

	const desc = '안녕하세요\n저희 숙소에 오신 걸 환영합니다\n흡연 노!\n고성방가 놉!\n';
	return (
		<Wrapper>
			{/* 하우스 번호 : {houseId}{' '} */}
			{desc}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	white-space: pre-wrap;
	padding: 1rem 3rem;
	text-align: left;
`;
