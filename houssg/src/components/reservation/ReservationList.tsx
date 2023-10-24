import { styled } from 'styled-components';
import { Collapse } from 'antd';

import ReservationCollapseDetail from './ReservationCollapseDetail';
import { openModal } from '../../store/redux/modalSlice';
import { useAppDispatch } from '../../hooks';

import { color } from '../../assets/styles';
import { ReservationDetailType, ReservationsType } from '../../types';
import { setPreviewNumber } from '../../store/redux/calendarSlice';

const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatPeriod = (reservationStartDate: string, reservationEndDate: string) => {
	const start = reservationStartDate.split('-');
	const startDate = start.join('');

	const end = reservationEndDate.split('-');
	const endDate = end.join('');

	const duration = parseInt(endDate, 10) - parseInt(startDate, 10);

	return duration >= 1 ? `(${duration}박)` : '';
};

const ReservationList: React.FC<{ reservations: ReservationsType }> = ({ reservations }) => {
	const detail: ReservationDetailType = {
		reservationNumber: reservations.reservationNumber,
		reservationTime: reservations.reservationTime,
		guestName: reservations.guestName,
		guestPhone: reservations.guestPhone,
		couponName: reservations.couponName,
		couponNumber: reservations.couponNumber,
		discount: reservations.discount,
		usePoint: reservations.usePoint,
		paymentAmount: reservations.paymentAmount,
	};

	const getStatusString = (reservationStatus: number): string => {
		switch (reservationStatus) {
			case 1:
				return '예약 완료';
			case 2:
				return '이용 완료';
			case 3:
				return '예약 취소';
			case 4:
				return '사업자 취소';
			default:
				return '알 수 없는 상태';
		}
	};

	// 예약상태 배경색 변경
	const statusStyle = {
		color: reservations.status === 0 ? color.color1 : reservations.status === 1 ? color.backColor : color.backColor,
		backgroundColor: reservations.status === 0 ? color.color5 : reservations.status === 1 ? color.color1 : color.darkGrayColor,
	};

	const dispatch = useAppDispatch();

	const modalOpen = (component: string, message: string | null, props: number[] | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message, modalProps: props }));
	};

	return (
		<ReservationWrapper>
			<ReservationContainer>
				<ReservationBox>
					{reservations.status === 1 ? (
						<ReservationButton
							hidden={false}
							onClick={() => {
								modalOpen('cancelReservation', `${reservations.reservationNumber}`, null);
							}}
						>
							취소하기
						</ReservationButton>
					) : (
						reservations.status === 2 &&
						(reservations.reviewStatus ? (
							<PreviewButton
								onClick={() => {
									dispatch(setPreviewNumber({ previewNumber: reservations.reservationNumber }));
									modalOpen('userPreview', null, null);
								}}
							>
								후기 보기
							</PreviewButton>
						) : (
							<ReviewWriteButton
								hidden={false}
								onClick={() => {
									modalOpen('userReview', null, [reservations.reservationNumber, reservations.accomNumber, reservations.roomNumber]);
								}}
							>
								후기 등록
							</ReviewWriteButton>
						))
					)}
				</ReservationBox>

				<ReservationNumberBox>예약번호 {reservations.reservationNumber}</ReservationNumberBox>

				<DetailContainer>
					<ImageBox>
						<OutdoorViewBox src={reservations.img} alt={`${reservations.couponName} + 이미지`}></OutdoorViewBox>
					</ImageBox>
					<DetailBox>
						<ReservationStatusBox style={statusStyle}>{getStatusString(reservations.status)}</ReservationStatusBox>
						<div>
							{reservations.accomName}&nbsp;({reservations.roomCategory})
						</div>
						<div>{formatDate(reservations.startDate)}~</div>
						<div>
							{formatDate(reservations.endDate)}
							{formatPeriod(reservations.startDate, reservations.endDate)}
						</div>
						<RoomPriceBox>{reservations.paymentAmount.toLocaleString()}원</RoomPriceBox>
					</DetailBox>
				</DetailContainer>
			</ReservationContainer>
			<CollapseContainer>
				<Collapse
					key={reservations.reservationNumber}
					size="small"
					ghost={true}
					accordion={true}
					bordered={false}
					items={[
						{
							key: reservations.reservationNumber,
							label: '상세정보',
							children: <ReservationCollapseDetail detail={detail} />,
						},
					]}
				/>
			</CollapseContainer>
		</ReservationWrapper>
	);
};

export default ReservationList;

const ReservationWrapper = styled.div`
	margin: 1rem;
	padding: 1rem 2rem;
	border: solid 1.5px ${color.color1};
	border-radius: 0.5rem;
	transition: width 0.1s;
`;

const ReservationContainer = styled.div`
	display: grid;
	grid-template-rows: 24px auto;
`;

const ReservationBox = styled.div`
	text-align: right;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-end: 2;
`;

const ReservationButton = styled.button`
	padding: 0.3rem 0.5rem;
	justify-self: right;
	align-self: center;
	border: none;
	border-radius: 0.5rem;
	background-color: ${color.unSelectColor};
	color: ${color.backColor};
	font-weight: bold;

	&:hover {
		cursor: pointer;
		border: none;
		border-radius: 0.5rem;
		background-color: ${color.darkGrayColor};
		color: ${color.backColor};
		font-weight: bold;
	}

	@media (max-width: 700px) {
		font-size: 0.5rem;

		&:hover {
			font-size: 0.5rem;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.7rem;

		&:hover {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 1400px) {
		font-size: 0.9rem;

		&:hover {
			font-size: 0.9rem;
		}
	}
`;

const ReviewWriteButton = styled.button`
	padding: 0.3rem 0.5rem;
	justify-self: right;
	align-self: center;
	border: none;
	border-radius: 0.5rem;
	background-color: ${color.color5};
	color: ${color.color1};
	font-weight: bold;
	&:hover {
		cursor: pointer;
		border: none;
		border-radius: 0.5rem;
		background-color: ${color.color1};
		color: ${color.backColor};
		font-weight: bold;
	}

	@media (max-width: 700px) {
		font-size: 0.5rem;

		&:hover {
			font-size: 0.5rem;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.7rem;

		&:hover {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 1400px) {
		font-size: 0.9rem;

		&:hover {
			font-size: 0.9rem;
		}
	}
`;

const PreviewButton = styled.button`
	padding: 0.3rem 0.5rem;
	justify-self: right;
	align-self: center;
	border: none;
	border-radius: 0.5rem;
	background-color: ${color.color5};
	color: ${color.color1};
	font-weight: bold;
	&:hover {
		cursor: pointer;
		border: none;
		border-radius: 0.5rem;
		background-color: ${color.color1};
		color: ${color.backColor};
		font-weight: bold;
	}

	@media (max-width: 700px) {
		font-size: 0.5rem;

		&:hover {
			font-size: 0.5rem;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.7rem;

		&:hover {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 1400px) {
		font-size: 0.9rem;

		&:hover {
			font-size: 0.9rem;
		}
	}
`;

const ReservationNumberBox = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 2;
	color: ${color.color2};
	padding-left: 1vw;
	justify-self: left;
	align-self: center;
	font-size: 0.8rem;
	font-weight: bold;
`;

const DetailContainer = styled.div`
	margin: 0.5rem 0;
	display: grid;
	grid-template-columns: 55% 45%;
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
`;

const ReservationStatusBox = styled.div`
	padding: 0.3rem;
	align-self: center;
	border: none;
	font-size: 0.7rem;
	width: 5rem;
	color: ${color.backColor};
	background-color: ${color.color2};
	border-radius: 1rem;
	text-align: center;
	line-height: 1rem;
	/* font-weight: bold; */
`;

const RoomPriceBox = styled.div`
	font-weight: bold;
`;

const CollapseContainer = styled.div`
	transition: width 0.1s;
	.ant-collapse-header-text {
		font-size: 1rem;
		color: ${color.color1};
		text-align: left;
		align-self: center;
	}

	.ant-collapse-header-text:hover {
		color: ${color.color3};
	}

	.ant-collapse-content-box {
		font-size: 1rem;
		width: 100%;
		color: ${color.color1};
		text-align: justify;
	}

	.ant-collapse-expand-icon {
		width: 10%;
		color: ${color.color1};
		align-items: right;
	}

	@media (max-width: 700px) {
		.ant-collapse-content-box {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		.ant-collapse-content-box {
			font-size: 0.8rem;
		}
	}
`;

const ImageBox = styled.div`
	margin-right: 1rem;
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 2;
	grid-row-end: 3;
	justify-items: center;
	align-self: center;
	transition: width 0.1s;
`;

const OutdoorViewBox = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 1rem;
`;

const DetailBox = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 2;
	grid-row-end: 3;
	font-size: 0.8rem;
	color: ${color.darkGrayColor};
	text-align: left;
	display: grid;
	grid-gap: 0.5rem;
	transition: width 0.1s;

	@media (max-width: 700px) {
		font-size: 0.7rem;
	}

	@media (min-width: 700px) and (max-width: 1400px) {
		font-size: 0.8rem;
	}

	@media (min-width: 1400px) {
		font-size: 0.9rem;
	}
`;
