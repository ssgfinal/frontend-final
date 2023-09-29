import { useState } from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';
import { moreIcon } from '../../../../assets/icons';
import { color } from '../../../../assets/styles';
import { roomServiceCategory } from '../../../../assets/constant';

const RoomCompRead: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	console.log('🛌🚪🛏💜◼');
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<RoomContainer>
			<RoomCategory>▪{room.room_category}▪</RoomCategory>
			<DropdownBox>
				<MoreBox src={moreIcon} onClick={toggleDropdown}></MoreBox>
				{isDropdownOpen && (
					<ButtonAligner>
						<NavClickComp
							onClick={() => {
								setIsEditMode(true);
							}}
						>
							수정하기
						</NavClickComp>
						<NavClickComp>삭제하기</NavClickComp>
					</ButtonAligner>
				)}
			</DropdownBox>
			<RoomImg src={room.room_image} />
			<RoomContent>
				<div>
					<span>객실수</span>
					{room.room_count}개
				</div>
				<div>
					<span>가격</span>
					{room.room_price}
				</div>
				<div>
					<span>상세 설명</span>
					{room.room_detail}
				</div>
				<InfoTitleText>시설 및 서비스</InfoTitleText>
				<ServiceContainer>
					{roomServiceCategory.map((service, i) => (
						<ManageReadService key={i} src={service.icon}></ManageReadService>
					))}
				</ServiceContainer>
			</RoomContent>
		</RoomContainer>
	);
};

export default RoomCompRead;

const RoomImg = styled.img`
	width: 95%;
	border-radius: 0.5rem;
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 3;

	@media (max-width: 800px) {
		justify-self: center;
		width: 80%;
		grid-column-start: 1;
		grid-column-end: 3;
		margin: 1rem;
	}
`;

const RoomContainer = styled.div`
	/* display: flex;
	flex-direction: row;
	justify-content: space-between; */
	margin: 0.5rem;
	display: grid;
	@media (max-width: 800px) {
		grid-template-columns: 12fr 1fr;
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

const ServiceContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem 0;
	gap: 0.5rem;
`;

const ManageReadService = styled.img`
	width: 2rem;

	@media (max-width: 300px) {
		width: 1rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		width: 1.5rem;
	}
`;

const RoomContent = styled.div`
	width: 100%;
	display: grid;
	justify-items: left;
	align-items: center;
	margin-left: 0.5rem;
	padding: 0.3rem;
	gap: 0.5rem;
	grid-column-start: 2;
	grid-column-end: 4;

	span {
		color: ${color.color1};
		font-weight: bold;
		text-align: left;
		margin-right: 0.5rem;
	}

	@media (max-width: 800px) {
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;

const RoomCategory = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	align-self: center;
	margin: 0.5rem;
	padding: 0.1rem;
	text-align: left;
	font-size: 1.2rem;
	font-weight: bold;
	/* border-radius: 0.5rem; */
	color: ${color.color1};
	/* color: ${color.backColor}; */
	/* background-color: ${color.color1}; */

	@media (max-width: 300px) {
		font-size: 1rem;
		transition: width 0.2s;
	}

	@media (max-width: 800px) {
		grid-column-start: 1;
		grid-column-end: 2;
	}
`;

const DropdownBox = styled.div`
	position: relative;
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 1;
	grid-row-end: 2;
	align-self: center;
	@media (max-width: 800px) {
		grid-column-start: 2;
		grid-column-end: 3;
	}
`;

const MoreBox = styled.img`
	justify-self: right;
	align-self: center;
	width: 2rem;
	cursor: pointer;

	@media (max-width: 400px) {
		width: 1rem;
		transition: width 0.2s;
	}
`;

const ButtonAligner = styled.div`
	background-color: ${color.backColor};
	border: 1px solid ${color.color1};
	border-radius: 0.5rem;
	padding: 0.5rem;
	box-shadow: 0 0 3px 1px ${color.color1};
	width: 100px;
	position: absolute;
	z-index: 2;
	right: 5px;
`;

const NavClickComp = styled.div`
	padding: 0.5rem;
	color: ${color.basicColor};
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	&:hover {
		color: ${color.color1};
	}
`;
