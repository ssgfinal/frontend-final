import styled from 'styled-components';
import { useAppSelector } from '../../../../hooks';
import { dateAvailableRooms } from '../../../../store/redux/calendarSlice';
import { color } from '../../../../assets/styles';

const DateAvailComp = () => {
	const eventList = useAppSelector(dateAvailableRooms);
	console.log(eventList);
	return (
		<Wrapper>
			<div></div>
			<div>
				{eventList.map((event) => (
					<EventContainer key={event.roomId}>
						<StyledText>
							{event.roomName} : {event.amount}
						</StyledText>
					</EventContainer>
				))}
			</div>
		</Wrapper>
	);
};

export default DateAvailComp;

const Wrapper = styled.div`
	margin-block: 0.5rem;
	min-height: 90px;
`;

const EventContainer = styled.div`
	border-bottom: 2px solid ${color.lightGrayColor};
	padding-block: 0.2rem;
`;

const StyledText = styled.div`
	font-size: 0.9rem;
	text-align: center;
	@media screen and (max-width: 500px) {
		font-size: 0.7rem;
	}
`;
