import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
// import { useParams } from 'react-router-dom';
import { Provision } from './Provision';
import { color, ReservationCommonBox, UserReservationTitle } from '../../assets/styles';
import styled from 'styled-components';
import { SelectedReservationType } from '../../types';
import api from '../../api/api';
import { userRoute, userUrl } from '../../assets/constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// 시크릿키는 .env에서 관리하는 걸 추천?

// 토스페이먼츠에서 제공하는 test용 키
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

interface PaymentWidgetProps {
	selectedReservation: SelectedReservationType;
}
export const PaymentWidget: React.FC<PaymentWidgetProps> = ({ selectedReservation }) => {
	const navigate = useNavigate();

	const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
	const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);

	const [isAgreed, setIsAgreed] = useState(false);
	useEffect(() => {
		(async () => {
			const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
			// loadPaymentWidget : PaymentWidget 인스턴스를 반환하는 메서드
			// PaymentWidget : 해당 인스턴스를 사용해서 결제위젯을 렌더링 함, 결제위젯 인스턴스는 결제를 요청하는 requestPayment()라는 함수도 반환
			const paymentMethodsWidget = paymentWidget.renderPaymentMethods('#payment-widget', selectedReservation.paymentPrice);
			// renderPaymentMethods로 결제위젯을 렌더링
			// paymentWidget.renderPaymentMethods()에서 updateAmount()를 반환함

			paymentWidgetRef.current = paymentWidget;
			// useRef를 사용해서 인스턴스 저장
			paymentMethodsWidgetRef.current = paymentMethodsWidget;
		})();
	}, [selectedReservation]);

	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');
	const location = useLocation();
	const houseId = location.state.houseId;
	const houseName = location.state.houseName;
	const room = location.state.room;

	const { roomId } = useParams();

	const paymentWidgetButtonFunc = () => {
		const paymentWidget = paymentWidgetRef.current;

		console.log('reservation night', selectedReservation.night);

		if (selectedReservation.night == 0) {
			console.log('reservation night', selectedReservation.night);
			alert('예약 기간을 정확히 입력해주세요.');
			return;
		}

		if (selectedReservation.visitorName === '') {
			alert('이용자명을 입력해주세요.');
			return;
		}
		if (selectedReservation.visitorPhone === '') {
			alert('이용자 전화번호를 입력해주세요.');
			return;
		}

		if (isAgreed === false) {
			alert('개인 정보 이용 동의가 필요합니다.');
			return;
		}
		try {
			console.log('예약 백에 날라감');
			api
				.post(userUrl.reservationEnroll, {
					startDate: selectedReservation.startDate,
					endDate: selectedReservation.endDate,
					nickname: userNickName,
					phoneNumber: userPhone,
					guestName: selectedReservation.visitorName,
					guestPhone: selectedReservation.visitorPhone,
					accomNumber: houseId,
					accomName: houseName,
					roomNumber: roomId,
					roomCategory: room.roomCategory,
					roomPrice: room.roomPrice,
					couponNumber: selectedReservation.usingCoupon.couponNumber,
					couponName: selectedReservation.usingCoupon.couponName,
					discount: selectedReservation.usingCoupon.discount,
					usePoint: selectedReservation.usingPoint,
					totalPrice: room.roomPrice * selectedReservation.night,
					paymentAmount: selectedReservation.paymentPrice,
				})
				.then(({ data }) => {
					console.log('data', data);
					try {
						// console.log('PaymentWidget seletedReservation > ', selectedReservation);
						paymentWidget &&
							paymentWidget
								.requestPayment({
									//원래 맨앞에 await이 있었음 근데 async는 없어서 에러 뜨길래 일단 지움
									orderId: data,
									orderName: `${houseName} ${room.roomCategory} ${selectedReservation.night}박 예약`,
									customerName: userNickName ? userNickName : 'houssg 고객님',
									// customerEmail: 'customer123@gmail.com',
								})
								.then(function (data) {
									console.log('결제 승인 시 토스페이먼츠 리스펀스 > ', data);
									// 결제 승인 API를 호출
									navigate(userRoute.reservationList);
								})
								.catch(function (error) {
									// 에러 처리 : 에러 목록을 확인
									if (error.code === 'USER_CANCEL') {
										// 결제 고객이 결제창을 닫았을 때 에러 처리
										alert('창이 닫혀서 결제가 완료되지 못 했습니다.s');
									} else if (error.code === 'INVALID_CARD_COMPANY') {
										// 유효하지 않은 카드 코드에 대한 에러 처리
										alert('카드 정보가 유효하지 않습니다');
									} else if (error.code === 'REJECT_CARD_PAYMENT') {
										// 유효하지 않은 카드 코드에 대한 에러 처리
										alert('한도초과 혹은 잔액부족으로 결제에 실패했습니다.');
									}
								});
					} catch (err) {
						console.log(err);
					}
				});
		} catch (err) {
			console.log(err);
			if (err === '예약 불가능') {
				alert('죄송합니다. 이미 예약이 완료된 방입니다.');
			}
		}
	};

	return (
		<>
			<ReservationCommonBox>
				<PaymentTitle> 결제 수단 </PaymentTitle>
				<div id="payment-widget" />
			</ReservationCommonBox>
			<Provision isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
			<PaymentFinalBtn onClick={paymentWidgetButtonFunc}>결제하기</PaymentFinalBtn>
		</>
	);
};

const PaymentTitle = styled(UserReservationTitle)`
	margin-bottom: 0;
`;

const PaymentFinalBtn = styled.button`
	cursor: pointer;
	margin: 2rem auto;
	width: 50%;
	padding: 1rem;
	font-weight: bold;
	font-size: 20px;
	/* background-color: white;
    color: ${color.color2}; */
	background-color: ${color.color2};
	color: white;
	border: solid ${color.color2};
	border-radius: 1rem;
`;
