import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Rating from '../common/Rating';
import { HouseProps } from '../../types';
import { userRoute } from '../../assets/constant';

const BriefHouse: React.FC<HouseProps> = ({ house }) => {
	const navigate = useNavigate();

	return (
		<BriefHouseWrapper>
			{/* TODO: 현재) 이미지만 클릭시 숙소 상세 페이지로 이동
		          안건) 글자도 클릭시 숙소 상세 페이지로 이동해야하는 거 아닌가?*/}
			<HoverContainer
				// < Link to = >는 자동으로 pointer 해줌
				onClick={() => {
					navigate(userRoute.houseDetail + house.accomNumber);
				}}
			>
				<HouseImg src={house.img} />
				{/* TODO: 글자 클릭 시 이미지 효과 낼 수 있나? */}
				<HoverBox></HoverBox>
			</HoverContainer>

			<HouseDetailContainer>
				<div>
					<span>
						{house.accomName}
						<br />
						{house.accomAddress}&nbsp;
					</span>
				</div>
				<RateBox>
					<Rating rate={house.avgRating} readonly />
				</RateBox>
				<PriceBox>
					<div>{house.minPrice.toLocaleString()}원</div>
				</PriceBox>
			</HouseDetailContainer>
		</BriefHouseWrapper>
	);
};

export default BriefHouse;

const BriefHouseWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
	padding: 0.5rem;
	text-align: left;

	@media (max-width: 430px) {
		font-size: 0.8rem;
	}
`;

const HouseDetailContainer = styled.div`
	/* margin: 0 1rem 1rem 1rem; */
	padding: 0 1rem 1rem 1rem;

	@media (max-width: 380px) {
		font-size: 0.5rem;
	}

	@media (max-width: 540px) {
		font-size: 0.8rem;
	}
`;

// TODO: 숙소 이미지 hover시 지나가는 효과
const HoverContainer = styled.div`
	/* TODO: 지금 상황에서 굳이 margin과 padding 둘 다 쓸 필요가 있나 여백을 2rem을 주고 싶더라도 걍 padding으로 2rem 줘도 되는거 아닌가? */
	/* margin: 1rem; */
	padding: 1rem;
	position: relative;
	overflow: hidden;

	&:hover div {
		background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.7));
		transition: 1s;
		left: calc(50% + 380px);
		opacity: 1;
	}
`;

const HouseImg = styled.img`
	cursor: pointer;
	width: 100%;
	border-radius: 0.8rem;
`;

// TODO: 숙소 이미지 hover시 지나가는 효과
const HoverBox = styled.div`
	position: absolute;
	background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
	width: 50px;
	height: 600px;
	transform: rotateZ(30deg);
	top: -100px;
	left: -130px;
	transition: 0.1s;
	opacity: 0.5;
`;

const RateBox = styled.div`
	width: 70%;
	text-align: left;
	font-size: 1rem;
	line-height: 1rem;
	margin-bottom: 0.3rem;

	@media (max-width: 320px) {
		font-size: 0.5rem;
		ul {
			margin-right: -15vw;
			font-size: 0.7rem;
		}
	}
`;

const PriceBox = styled.div`
	align-self: flex-end;
	text-align: right;
	font-weight: bold;
	font-size: 1rem;

	@media (max-width: 380px) {
		font-size: 0.5rem;
	}

	@media (max-width: 540px) {
		font-size: 0.8rem;
	}
`;
