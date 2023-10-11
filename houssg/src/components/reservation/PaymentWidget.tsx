import { useEffect, useRef } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
// import { useParams } from 'react-router-dom';
import { Provision } from './Provision';
import { color, ReservationCommonBox, UserReservationTitle } from '../../assets/styles';
import styled from 'styled-components';

// 시크릿키는 .env에서 관리하는 걸 추천?

// 토스페이먼츠에서 제공하는 test용 키
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

interface Coupon {
	couponId: string;
	couponName: string;
	// expirationDate: string; // 예약하기 페이지에선 없어도 될 듯
	discountPrice: number;
}

interface GiveReservation {
	roomId: number;
	selectedReservationDate?: string;
	visitorName: string;
	visitorPhone: string;
	usingCoupon: Coupon; // 프론트에서 선택한 쿠폰 한개
	usingPoint: number;
	paymentPrice: number;
}

interface PaymentWidgetProps {
	selectedReservation: GiveReservation;
}
export const PaymentWidget: React.FC<PaymentWidgetProps> = ({ selectedReservation }) => {
	// const { roomId } = useParams();

	const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
	const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);

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

	// 가격이 바뀌면 updateAmount를 호출하는 코드
	// 현재는 할인을 다른 컴포넌트서 실행
	// 추후 라이브러리 할인 쓰는 것도 고려
	// useEffect(() => {
	// 	const paymentMethodsWidget = paymentMethodsWidgetRef.current;

	// 	if (paymentMethodsWidget == null) {
	// 		return;
	// 	}

	// 	paymentMethodsWidget.updateAmount(payment, paymentMethodsWidget.UPDATE_REASON.COUPON);
	// }, [payment]);

	const paymentWidgetButtonFunc = () => {
		const paymentWidget = paymentWidgetRef.current;
		// console.log('PaymentWidget selectedReservation > ', selectedReservation);
		try {
			// console.log('PaymentWidget seletedReservation > ', selectedReservation);
			paymentWidget?.requestPayment({
				//원래 맨앞에 await이 있었음 근데 async는 없어서 에러 뜨길래 일단 지움
				orderId: 'abcdefgh',
				orderName: '토스 티셔츠 외 2건',
				customerName: '김토스',
				customerEmail: 'customer123@gmail.com',
				successUrl: `${window.location.origin}/user/reservation/${selectedReservation.roomId}`,
				failUrl: `${window.location.origin}/user/house`,
				//   successUrl: `${window.location.origin}/success`,
				//   failUrl: `${window.location.origin}/fail`,
			});
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<>
			<ReservationCommonBox>
				<PaymentTitle> 결제 수단 </PaymentTitle>
				<div id="payment-widget" />
				{/* 할인 수단 - 보류 */}
				{/*         
        <div>
          <input
            type="checkbox"
            onChange={(event) => {
                // 여기가 updateAmount부분인듯?
              setPrice(event.target.checked ? price - 5_000 : price + 5_000) // 체크하면 5000원을 깍고 해제하면 다시 5만원으로 설정?
            }}
          />
          <label>5,000원 할인 쿠폰 적용</label>
        </div>
        */}
			</ReservationCommonBox>
			<Provision />
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
