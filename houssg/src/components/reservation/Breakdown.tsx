import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const Breakdown = () => {
	const coupons = [
		{
			couponId: 1,
			couponName: '9월달 행사',
			expirationDate: '2023-09-10',
			discountPrice: 3000,
		},
		{
			couponId: 2,
			couponName: '대체공휴일 맞이',
			expirationDate: '2023-09-20',
			discountPrice: 1200,
		},
	];

	const totalPoint = 35;

	const reservation = {
		id: 1,
		night: 2,
		price: 64000,
		userNickName: '김도로뇽',
		userPhone: '01012345678',
	};
	const room = {
		id: 1,
		type: '스탠다드',
		price: 32000,
	};

	// 적용할 포인트
	const [point, setPoint] = useState(0);

	// 결제 금액
	const [payment, setPayment] = useState(reservation.night * room.price);

	const [selectedCoupon, setSelectedCoupon] = useState({
		couponId: 0,
		couponName: '',
		expirationDate: '',
		discountPrice: 0,
	});

	const [pointStatus, setPointStatus] = useState('num');
	const handleCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCoupon(coupons[Number(e.target.value)]);
	};

	const handlePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isNaN(Number(e.target.value))) {
			console.log('숫자 아님');
			setPointStatus('text');
			setPoint(0);
		} else {
			if (Number(e.target.value) > totalPoint) {
				setPointStatus('higher');
				setPoint(totalPoint);
			} else {
				setPointStatus('num');
				setPoint(Number(e.target.value));
			}
		}
	};

	const useTotalPoint = () => {
		setPoint(totalPoint);
	};

	// 쿠폰 만료 여부 검사하는 함수
	function isFutureDate(checkDate: string): boolean {
		const targetDate = new Date(checkDate);
		const currentDate = new Date();
		return targetDate > currentDate;
	}

	// 선택된 쿠폰, 포인트가 달라질 때마다 결재 금액 변경
	useEffect(() => {
		setPayment(reservation.night * room.price - selectedCoupon.discountPrice - point);
	}, [selectedCoupon, point, reservation.night, room.price]);

	return (
		<>
			<ReservationCommonBox>
				<UserReservationTitle>할인</UserReservationTitle>
				<UserReservationLeft>쿠폰</UserReservationLeft>
				<UserReservationLeft>
					<Select onChange={(e) => handleCoupon(e)}>
						<option value={''}>사용 안 함</option>
						{coupons.map((coupon, idx) => {
							if (isFutureDate(coupon.expirationDate) === false) {
								return (
									<ExpiredCoupon key={idx} value={idx} disabled>
										{coupon.couponName}
										(만료된 쿠폰)
									</ExpiredCoupon>
								);
							} else {
								return (
									<option key={idx} value={idx}>
										{coupon.couponName}
									</option>
								);
							}
						})}
					</Select>
				</UserReservationLeft>
				<UserReservationLeft>포인트</UserReservationLeft>
				<Gray>보유 포인트 {totalPoint}</Gray>
				<UserReservationLeft>
					{/* <PointInput name="point" value={point} onChange={(e) => setPoint(Number(e.target.value))} /> &nbsp; */}
					<PointInput name="point" value={point} onChange={(e) => handlePoint(e)} /> &nbsp;
					<Button onClick={useTotalPoint}> 전액 사용 </Button>
					{pointStatus == 'text' ? (
						<Warning>숫자만 입력가능합니다.</Warning>
					) : pointStatus == 'higher' ? (
						<Warning>입력한 포인트는 보유 포인트 초과로 보유한 전포인트를 적용시킵니다.</Warning>
					) : (
						<></>
					)}
				</UserReservationLeft>
			</ReservationCommonBox>
			<ReservationCommonBox>
				<UserReservationTitle>결제 금액 </UserReservationTitle>
				<AboutPayment>
					<div>상품 금액</div>
					<Between>
						<div> &nbsp; </div>
						<div>{(reservation.night * room.price).toLocaleString()}</div>
					</Between>
					<div>할인 금액 </div>
					<Between>
						<div>&minus; </div>
						<div>{selectedCoupon.discountPrice.toLocaleString()}</div>
					</Between>
					<div>포인트 </div>
					<Between>
						<div>&minus; </div>
						<div>{point}</div>
					</Between>
					<Hr />
					<div>총 결제 금액</div>
					<Between>
						<div> &nbsp;</div>
						<div>{payment.toLocaleString()}</div>
					</Between>
				</AboutPayment>
			</ReservationCommonBox>
		</>
	);
};

const Select = styled.select`
	&:hover {
		cursor: pointer; /* 또는 'cursor: grab;' 또는 'cursor: pointer;' 등 원하는 커서 스타일로 변경하세요. */
	}
`;

const ExpiredCoupon = styled.option`
	background-color: ${color.unSelectColor};
	color: white;
`;

const Gray = styled(UserReservationLeft)`
	color: ${color.darkGrayColor};
	font-size: 0.8rem;
	margin-bottom: 0;
`;

const Input = styled.input`
	border: none;
	border-bottom: 1px solid ${color.color1};
	outline: none;
	margin-bottom: 0.5rem;
	width: 30%;

	/* 숫자 증감 버튼 숨기기 */
	&[type='number']::-webkit-outer-spin-button,
	&[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}
`;

const PointInput = styled(Input)`
	width: 5rem;
`;

const Button = styled.button`
	border: none;
	border-radius: 0.3rem;
	background-color: ${color.color2};
	color: white;

	&:hover {
		cursor: pointer; /* 또는 'cursor: grab;' 또는 'cursor: pointer;' 등 원하는 커서 스타일로 변경하세요. */
	}
`;

const Warning = styled.div`
	color: red;
	font-size: 0.5rem;
`;
const AboutPayment = styled.div`
	padding-right: 1rem;
	display: grid;
	grid-template-columns: 5fr 1fr;
	text-align: left;
	grid-gap: 0.5rem;
`;

const Between = styled(UserReservationLeft)`
	display: flex;
	justify-content: space-between;
`;

const Hr = styled.hr`
	border: solid 1px ${color.color1};
	opacity: 50%;
	width: 100%;
	grid-column-start: 1;
	grid-column-end: 3;
`;
