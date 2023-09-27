import { useState } from 'react';
import { RoomComp } from '../../../../types';
import { styled } from 'styled-components';
import { moreIcon } from '../../../../assets/icons';
import { color } from '../../../../assets/styles';

const RoomCompRead: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<RoomContainer>
			<RoomImg src={room.room_image} />
			<RoomContent>
				<div>
					<span>객실 종류</span>
					{room.room_category}
				</div>
				<div>
					<span>객실 갯수</span>
					{room.room_count}개
				</div>
				<div>
					<span>객실 가격</span>
					{room.room_price}
				</div>
				<div>
					<span>객실 설명</span>
					{room.room_detail}
				</div>
			</RoomContent>
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
		</RoomContainer>
	);
};

export default RoomCompRead;

const RoomImg = styled.img`
	width: 10vw;
	border-radius: 0.5rem;
`;

const RoomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 1rem;
`;

const RoomContent = styled.div`
	width: 100%;
	display: grid;
	justify-items: left;
	align-items: center;
	margin-left: 0.5rem;
	padding: 0.3rem;

	span {
		color: ${color.color1};
		font-weight: bold;
		text-align: left;
		margin-right: 0.5rem;
	}
`;

const DropdownBox = styled.div`
	position: relative;
`;

const MoreBox = styled.img`
	grid-column-start: 2;
	grid-column-end: 3;
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
