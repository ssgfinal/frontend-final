import styled from 'styled-components';
import { useAppSelector } from '../../../../hooks';
import { dateCalendarEvents } from '../../../../store/redux/calendarSlice';
import { color } from '../../../../assets/styles';

const DateReserveComp = () => {
	const { date, events } = useAppSelector(dateCalendarEvents);

	return (
		<Wrapper>
			{events && events.length === 0 ? (
				<div>예약이 없습니다</div>
			) : (
				<>
					<EventContainer>
						<StyledBoldText> 객실 이름</StyledBoldText>
						<StyledBoldText> 이용자</StyledBoldText>
						<StyledBoldText> 연락처</StyledBoldText>
						<StyledBoldText> 이용상태</StyledBoldText>
					</EventContainer>
					{events.map((element) => {
						const roomGuestName = element.title.split(' : ');
						const roomName = roomGuestName[0];
						const guestName = roomGuestName[1];
						const currentDate = new Date(date);

						currentDate.setDate(currentDate.getDate() + 1);

						const year = currentDate.getFullYear();
						const month = String(currentDate.getMonth() + 1).padStart(2, '0');
						const day = String(currentDate.getDate()).padStart(2, '0');
						const nextDay = `${year}-${month}-${day}`;
						const status = date === element.start ? '입실' : nextDay === element.end ? '퇴실예정' : '투숙';
						return (
							<>
								<EventContainer key={element.id}>
									<StyledText>{roomName}</StyledText>
									<StyledText>{guestName}</StyledText>
									<StyledText> {element.constraint}</StyledText>
									<StyledText> {status}</StyledText>
								</EventContainer>
							</>
						);
					})}
				</>
			)}
		</Wrapper>
	);
};

export default DateReserveComp;
const Wrapper = styled.div`
	margin-block: 0.5rem;
	width: 100%;
	min-height: 90px;
`;

const EventContainer = styled.div`
	gap: 2%;
	border-bottom: 2px solid ${color.lightGrayColor};
	padding-block: 0.2rem;
	display: grid;
	grid-template-columns: 24.5% 24.5% 24.5% 24.5%;
`;

const StyledBoldText = styled.div`
	font-size: 0.9rem;
	font-weight: 600;
	text-align: center;
	@media screen and (max-width: 500px) {
		font-size: 0.7rem;
	}
`;

const StyledText = styled.div`
	font-size: 0.9rem;
	text-align: center;
	@media screen and (max-width: 500px) {
		font-size: 0.7rem;
	}
`;
