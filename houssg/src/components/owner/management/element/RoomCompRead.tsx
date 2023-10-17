import { styled } from 'styled-components';
import { useState } from 'react';
import { RoomComp } from '../../../../types';
import { moreIcon } from '../../../../assets/icons';
import { color } from '../../../../assets/styles';
import { roomServiceCategory } from '../../../../assets/constant';
import { RoomImgSlider } from '../../../common';
import { useAppDispatch } from '../../../../hooks';
import { openModal } from '../../../../store/redux/modalSlice';

const RoomCompRead: React.FC<RoomComp> = ({ room, setIsEditMode }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const dispatch = useAppDispatch();
	const modalOpen = () => {
		dispatch(openModal({ modalComponent: 'DeleRequest', modalSize: 300, modalText: 'room && ' + room.accomNumber + ' && ' + room.roomNumber }));
	};

	return (
		<RoomContainer>
			<RoomCategory>✧&nbsp;{room.roomCategory}&nbsp;✧</RoomCategory>
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
						<NavClickComp onClick={modalOpen}>삭제하기</NavClickComp>
					</ButtonAligner>
				)}
			</DropdownBox>
			<SliderContainer>
				<RoomImgSlider data={room.imgs}></RoomImgSlider>
			</SliderContainer>
			<RoomContent>
				<RoomSubTitle>
					<span>개수</span>
				</RoomSubTitle>
				<RoomSubContent>{room.roomAvailability}개</RoomSubContent>
				<RoomSubTitle>
					<span>가격</span>
				</RoomSubTitle>
				<RoomSubContent>{room.roomPrice.toLocaleString()}원</RoomSubContent>
				<InfoTitleText>시설 및 서비스</InfoTitleText>
				<ServiceContainer>
					{room.service.map((service, i) => !!service && <ManageReadService key={i} src={roomServiceCategory[i].icon}></ManageReadService>)}
				</ServiceContainer>
			</RoomContent>
		</RoomContainer>
	);
};

export default RoomCompRead;

const RoomContainer = styled.div`
	padding-bottom: 1rem;
	margin: 0.5rem;
	display: grid;

	@media (max-width: 800px) {
		grid-template-columns: 12fr 1fr;
	}
`;

const SliderContainer = styled.div`
	width: 100%;
	max-width: 15rem;
	margin: 0 auto;
	@media screen and (max-width: 800px) {
		max-width: 18rem;
	}
`;

const InfoTitleText = styled.span`
	font-size: 1rem;
	font-weight: bold;
	padding-bottom: 0.1rem;
	color: ${color.color1};
	grid-column-start: 1;
	grid-column-end: 3;

	@media (max-width: 300px) {
		font-size: 0.8rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 800px) {
		padding: 0.5rem 0 0.5rem 0;
		grid-column-start: 1;
		grid-column-end: 3;
		text-align: left;
		font-size: 1rem;
	}
`;

const ServiceContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
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
	grid-template-columns: 1fr 6fr;
	justify-items: left;
	align-items: center;
	margin-left: 0.5rem;
	padding: 0.3rem;
	gap: 0.5rem;
	grid-column-start: 2;
	grid-column-end: 4;

	span {
		color: ${color.color1};
		font-weight: 600;
		text-align: left;
		margin-right: 0.5rem;
	}

	@media (max-width: 300px) {
		grid-template-columns: 3fr 9fr;
		font-size: 0.8rem;
		transition: width 0.2s;
	}

	@media (min-width: 300px) and (max-width: 400px) {
		grid-template-columns: 2fr 9fr;
		font-size: 1rem;
		transition: width 0.2s;
	}

	@media (max-width: 800px) {
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;

const RoomSubTitle = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
`;

const RoomSubContent = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
`;

const RoomCategory = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 2;
	align-self: center;
	margin: 0.5rem 0;
	padding: 0.1rem;
	text-align: left;
	font-size: 1.2rem;
	font-weight: bold;
	color: ${color.color1};

	@media (max-width: 300px) {
		font-size: 1rem;
		transition: width 0.2s;
	}

	@media (max-width: 800px) {
		grid-column-start: 1;
		grid-column-end: 2;
		font-size: 1rem;
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
		width: 1.5rem;
		transition: width 0.2s;
	}
`;

const ButtonAligner = styled.div`
	background-color: ${color.backColor};
	border: 1px solid ${color.color1};
	border-radius: 0.5rem;
	padding: 0.5rem;
	box-shadow: 0 0 3px 1px ${color.color1};
	width: 90px;
	position: absolute;
	z-index: 2;
	right: 5px;

	@media (max-width: 300px) {
		width: 85px;
		transition: width 0.2s;
	}
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
