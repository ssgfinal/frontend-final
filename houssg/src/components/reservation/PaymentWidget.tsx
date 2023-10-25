import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { Provision } from './Provision';
import { color, ReservationCommonBox, UserReservationTitle } from '../../assets/styles';
import styled from 'styled-components';
import { SelectedReservationType, UserReservationIsSuccessType } from '../../types';
import api from '../../api/api';
import { userRoute, userUrl } from '../../assets/constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userReservationIsSuccess } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

interface PaymentWidgetProps {
	selectedReservation: SelectedReservationType;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({ selectedReservation }) => {
	const navigate = useNavigate();

	const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
	const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ reservationNumber, sign }: UserReservationIsSuccessType) => userReservationIsSuccess(reservationNumber, sign),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myReservation] });
			alert('예약이 완료되었습니다.');
		},
		onError: () => {
			alert('죄송합니다. 예약 완료에 문제가 발생했습니다. houssg 고객센터로 문의 부탁드립니다.');
		},
	});

	const [isAgreed, setIsAgreed] = useState(false);
	useEffect(() => {
		(async () => {
			const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
			const paymentMethodsWidget = paymentWidget.renderPaymentMethods('#payment-widget', selectedReservation.paymentPrice);

			paymentWidgetRef.current = paymentWidget;
			paymentMethodsWidgetRef.current = paymentMethodsWidget;
		})();
	}, [selectedReservation]);

	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');
	const originPoint = Number(sessionStorage.getItem('point'));
	const location = useLocation();
	const houseId = location.state.houseId;
	const houseName = location.state.houseName;
	const room = location.state.room;

	const { roomId } = useParams();

	const paymentWidgetButtonFunc = () => {
		const paymentWidget = paymentWidgetRef.current;

		if (!selectedReservation.night) {
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

		if (
			selectedReservation.usingCoupon.discount !== 0 ||
			(selectedReservation.usingPoint !== 0 &&
				selectedReservation.paymentPrice < selectedReservation.usingCoupon.discount + selectedReservation.usingPoint)
		) {
			alert('쿠폰 및 포인트의 사용 총액이 결제할 금액보다 많은 경우는 결제가 불가합니다.');
			return;
		}

		try {
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
					const reservationNumFromBack = data;
					paymentWidget &&
						paymentWidget
							.requestPayment({
								orderId: reservationNumFromBack,
								orderName: `${houseName} ${room.roomCategory} ${selectedReservation.night}박 예약`,
								customerName: userNickName ? userNickName : 'houssg 고객님',
							})
							.then(function () {
								mutate({ reservationNumber: reservationNumFromBack, sign: 'success' });
								// 포인트 사용시, 세션에 포인트도 업데이트
								if (selectedReservation.usingPoint > 0) {
									sessionStorage.setItem('point', originPoint - selectedReservation.usingPoint + '');
								}

								navigate(userRoute.reservationList);
							})
							.catch(function (err) {
								if (err.code === 'USER_CANCEL') {
									// 결제 고객이 결제창을 닫았을 때 에러 처리
									alert('창이 닫혀서 결제가 완료되지 못 했습니다.');
								} else if (err.code === 'INVALID_CARD_COMPANY') {
									// 유효하지 않은 카드 코드에 대한 에러 처리
									alert('카드 정보가 유효하지 않습니다');
								} else if (err.code === 'REJECT_CARD_PAYMENT') {
									// 유효하지 않은 카드 코드에 대한 에러 처리
									alert('한도초과 혹은 잔액부족으로 결제에 실패했습니다.');
								}
								mutate({ reservationNumber: reservationNumFromBack, sign: 'fail' });
							});
				});
		} catch (err) {
			if (err === '예약 불가능') {
				alert('죄송합니다. 해당 날짜는 이미 예약이 완료된 방입니다.');
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
	background-color: ${color.color2};
	color: white;
	border: solid ${color.color2};
	border-radius: 1rem;
`;

export default PaymentWidget;
