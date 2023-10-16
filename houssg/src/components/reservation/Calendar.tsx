import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { BookableRoomCnt, SelectedReservationType } from '../../types';
import styled from 'styled-components';
import { color } from '../../assets/styles';
import { useEffect, useState } from 'react';
import { resetAuthStatus } from '../../store/redux/authSlice';

interface CalendarProps {
	initBookableRoomList: BookableRoomCnt[];
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}
const Calendar: React.FC<CalendarProps> = ({ initBookableRoomList, selectedReservation, setSelectedReservation }) => {
	interface Schedule {
		title: string;
		date: string;
		allDay: boolean;
	}
	const [event, setEvent] = useState<Schedule[]>();

	const [startObj, setStartObj] = useState<DateClickArg>();
	const [endObj, setEndObj] = useState<DateClickArg>();

	const today = dateFormat(new Date());

	const beforeToday: Schedule[] = [];
	const [noRoom, setNoRoom] = useState<Schedule[]>();

	function dateFormat(date: Date) {
		const dateFormat2 =
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
			'-' +
			(date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
		return dateFormat2;
	}

	const makeTwo = (date: number) => {
		if (date < 10) {
			return '0' + date;
		}
		return date;
	};

	useEffect(() => {
		for (let i = 1; i < Number(today.slice(8, 10)); i++) {
			beforeToday.push({
				title: '이전 날짜',
				date: today.slice(0, 8) + makeTwo(i),
				allDay: true,
			});
		}

		const noRoomTmp: Schedule[] = [];
		initBookableRoomList &&
			initBookableRoomList.forEach((roomPerDay: BookableRoomCnt) => {
				if (roomPerDay.availableRooms == 0) {
					noRoomTmp.push({
						title: '매진',
						date: roomPerDay.date,
						allDay: true,
					});
				}
			});
		setNoRoom(noRoomTmp);
		setEvent([...noRoomTmp, ...beforeToday]);
	}, [initBookableRoomList]);

	const periodCheck = (endDate: string) => {
		let isPossible = true;
		for (let i = Number(selectedReservation.startDate.slice(8, 10)); i < Number(endDate.slice(8, 10)); i++) {
			noRoom &&
				noRoom.forEach((room: Schedule) => {
					if (room.date === endDate.slice(0, 8) + i) {
						isPossible = false;
					}
				});
		}
		return isPossible ? 'possible' : 'impossible';
	};

	const startOrEnd = () => {
		// 시작일이 초기값이거나 이미 종료일이 차있으면 새로 클릭된 날짜는 시작일
		if (selectedReservation.startDate === '' || selectedReservation.endDate !== '') {
			return 'start';
		}
		return 'end';
	};

	const changeCss = (type: string, args: DateClickArg, text?: string) => {
		if (type === 'select') {
			args.dayEl.style.backgroundColor = color.color4;
			args.dayEl.innerHTML = `<div class='start'>${text}</div>`;
		} else if (type === 'unselect' && startObj) {
			args.dayEl.style.backgroundColor = 'white';
			args.dayEl.innerText = '';
		}
	};

	// 날짜를 클릭시
	const handleDateClick = (args: DateClickArg) => {
		const found = event?.find((e) => e.date === args.dateStr);
		if (found) {
			if (selectedReservation.startDate === '') {
				console.log('예약 불가');
				alert('예약이 불가합니다.');
			}
		} else {
			console.log('예약 가능');

			if (selectedReservation.startDate === '') {
				setSelectedReservation({
					...selectedReservation,
					startDate: args.dateStr,
				});
				setStartObj(args);
				changeCss('select', args, '시작일');
			} else {
				if (selectedReservation.endDate === '') {
					if (args.dateStr <= selectedReservation.startDate) {
						alert('종료일은 시작일보다 더 이후여야합니다.');
					} else {
						if (periodCheck(args.dateStr) === 'possible') {
							setEndObj(args);
							setSelectedReservation({
								...selectedReservation,
								endDate: args.dateStr,
							});
							changeCss('select', args, '종료일');
						} else {
							alert('선택하신 기간 중 예약 불가한 날짜가 포함되어잇습니다.');
						}
					}
				} else {
					if (startObj) {
						changeCss('unselect', startObj);
					}
					if (endObj) {
						changeCss('unselect', endObj);
					}
					setEndObj(undefined);

					setStartObj(args);

					setSelectedReservation({
						...selectedReservation,
						startDate: args.dateStr,
						endDate: '',
					});

					changeCss('select', args, '시작일');
				}
			}
		}
	};

	function calculateNights(startDate: string, endDate: string) {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const timeDifference = end.getTime() - start.getTime();
		const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
		return nights;
	}

	useEffect(() => {
		const nights = calculateNights(selectedReservation.startDate, selectedReservation.endDate);
		setSelectedReservation({
			...selectedReservation,
			night: Number(nights),
		});
	}, [selectedReservation.endDate]);

	return (
		<>
			<Period>
				<CustomDate>시작일 : {selectedReservation.startDate}</CustomDate>
				<CustomDate>종료일 : {selectedReservation.endDate}</CustomDate>
				<CustomDate>
					{!selectedReservation.night ? (
						<>[ 0박 0일 ]</>
					) : (
						<>
							[ {selectedReservation.night}박 {selectedReservation.night + 1}일 ]
						</>
					)}
				</CustomDate>
			</Period>
			<CalendarContainer>
				<FullCalendar
					headerToolbar={{
						left: 'prev next', // 좌측버튼
						center: 'title',
						end: 'today',
					}}
					locale={'ko'} // 한국어
					businessHours={true} // 주말을 다른 색으로
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					dateClick={handleDateClick}
					events={event}
					aspectRatio={2}
					dayMaxEvents={1}
					eventBorderColor="transparent"
					eventContent={(arg) => {
						const title = arg.event.title;

						// 여기에서 이벤트 컨텐츠를 커스터마이즈할 수 있습니다.
						const customContent = document.createElement('div');
						customContent.textContent = title;

						if (title === '매진') {
							customContent.classList.add('calendar-unable');
						} else if (title == '이전 날짜') {
							customContent.classList.add('calendar-unable');
						}

						return { domNodes: [customContent] };
					}}
				/>
			</CalendarContainer>
		</>
	);
};

export default Calendar;

const Period = styled.div`
	padding: 2rem;
	display: flex;
	justify-content: space-between;
`;

const CustomDate = styled.div`
	width: 40%;
`;

const CalendarContainer = styled.div`
	padding: 0 0.5rem;
	.fc-daygrid-day-frame {
		cursor: pointer;
	}

	.fc-h-event {
		background-color: ${color.unSelectColor};
		border: ${color.unSelectColor};
	}

	.calendar-unable {
		background-color: ${color.unSelectColor};
		border: none !important;
		/* cursor: not-allowed; */
		text-align: center;
	}

	.start {
		background-color: ${color.color1};
	}
`;
