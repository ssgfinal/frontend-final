import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { useLocation } from 'react-router-dom';
import { CouponType, SelectedReservationType } from '../../types';

interface BreakdownProps {
	initCouponList: CouponType[];
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType | undefined>>;
}

const Breakdown: React.FC<BreakdownProps> = ({ initCouponList, selectedReservation, setSelectedReservation }) => {
	const location = useLocation();
	const room = location.state.room;

	const totalPoint = Number(sessionStorage.getItem('point'));

	const [htmlCoupon, setHtmlCoupon] = useState('');

	useEffect(() => {
		setSelectedReservation({
			...selectedReservation,
			paymentPrice: selectedReservation.night * room.roomPrice,
		});
	}, []);

	const [pointWarning, setPointWarning] = useState('');

	const handleCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (selectedReservation.night === 0) {
			alert('예약 기간을 먼저 선택해주세요.');
			return;
		}
		const result = selectedReservation.night * room.roomPrice - initCouponList[Number(e.target.value)].discount - selectedReservation.usingPoint;
		if (result < 0) {
			alert('할인 금액은 상품 금액보다 작게 설정되어야합니다.');
			setHtmlCoupon('');
			return;
		}
		setSelectedReservation({
			...selectedReservation,
			usingCoupon: initCouponList[Number(e.target.value)],
		});
		setHtmlCoupon(e.target.value);
	};

	const handlePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedReservation.night === 0) {
			alert('예약 기간을 먼저 선택해주세요.');
			return;
		}

		if (isNaN(Number(e.target.value))) {
			setPointWarning('숫자만 입력가능합니다');
			setSelectedReservation({
				...selectedReservation,
				usingPoint: 0,
			});
		} else {
			if (Number(e.target.value) > totalPoint) {
				setPointWarning('입력한 포인트는 보유 포인트 초과로 보유한 전포인트를 적용시킵니다.');
				const result = selectedReservation.night * room.roomPrice - selectedReservation.usingCoupon.discount - totalPoint;
				if (result < 0) {
					setSelectedReservation({
						...selectedReservation,
						usingPoint: selectedReservation.night * room.roomPrice,
					});
					setPointWarning('입력한 포인트는 상품 금액 초과로 상품 금액을 적용시킵니다.');
					return;
				}
				setSelectedReservation({
					...selectedReservation,
					usingPoint: totalPoint,
				});
			} else {
				const result = selectedReservation.night * room.roomPrice - selectedReservation.usingCoupon.discount - Number(e.target.value);
				if (result < 0) {
					alert('할인 금액은 상품 금액보다 작게 설정되어야합니다.');
					return;
				}
				setPointWarning('');
				setSelectedReservation({
					...selectedReservation,
					usingPoint: Number(e.target.value),
				});
			}
		}
	};

	const useTotalPoint = () => {
		if (selectedReservation.night === 0) {
			alert('예약 기간을 먼저 선택해주세요.');
			return;
		}
		const result = selectedReservation.night * room.roomPrice - selectedReservation.usingCoupon.discount - totalPoint;
		if (result < 0) {
			setSelectedReservation({
				...selectedReservation,
				usingPoint: selectedReservation.night * room.roomPrice - selectedReservation.usingCoupon.discount,
			});
			setPointWarning('입력한 포인트는 상품 금액 초과로 상품 금액을 적용시킵니다.');
			return;
		}
		setSelectedReservation({
			...selectedReservation,
			usingPoint: totalPoint,
		});
	};

	useEffect(() => {
		setSelectedReservation({
			...selectedReservation,
			paymentPrice: selectedReservation.night * room.roomPrice - selectedReservation.usingCoupon.discount - selectedReservation.usingPoint,
		});
	}, [selectedReservation.night, room.roomPrice, selectedReservation.usingCoupon, selectedReservation.usingPoint]);

	return (
		<>
			<ReservationCommonBox>
				<UserReservationTitle>할인</UserReservationTitle>
				<UserReservationLeft>쿠폰</UserReservationLeft>
				<UserReservationLeft>
					<Select onChange={(e) => handleCoupon(e)} value={htmlCoupon}>
						{initCouponList && initCouponList.length === 0 ? (
							<option value={''}>사용 가능한 쿠폰 없음</option>
						) : (
							<>
								<option value={''}>사용 안 함</option>
								{initCouponList &&
									initCouponList.map((coupon, idx) => {
										return (
											<option key={idx} value={idx}>
												{coupon.couponName}
											</option>
										);
									})}
							</>
						)}
					</Select>
				</UserReservationLeft>
				<UserReservationLeft>포인트</UserReservationLeft>
				<Gray>보유 포인트 {totalPoint}</Gray>
				<UserReservationLeft>
					<PointInput name="point" value={selectedReservation.usingPoint} onChange={(e) => handlePoint(e)} /> &nbsp;
					<Button onClick={useTotalPoint}> 전액 사용 </Button>
					{pointWarning && <Warning>{pointWarning}</Warning>}
				</UserReservationLeft>
			</ReservationCommonBox>
			<ReservationCommonBox>
				<UserReservationTitle>결제 금액 </UserReservationTitle>
				<AboutPayment>
					<div>상품 금액</div>
					<Between>
						<div> &nbsp; </div>
						<div>{!selectedReservation.night ? <>0</> : <>{(room.roomPrice * selectedReservation.night).toLocaleString()}</>}</div>
					</Between>
					<div>할인 금액 </div>
					<Between>
						<div>&minus; </div>
						<div>{selectedReservation.usingCoupon.discount.toLocaleString()}</div>
					</Between>
					<div>포인트 </div>
					<Between>
						<div>&minus; </div>
						<div>{selectedReservation.usingPoint}</div>
					</Between>
					<Hr />
					<div>총 결제 금액</div>
					<Between>
						<div> &nbsp;</div>
						<div>{!selectedReservation.paymentPrice ? <>0</> : <>{selectedReservation.paymentPrice.toLocaleString()}</>}</div>
					</Between>
				</AboutPayment>
			</ReservationCommonBox>
		</>
	);
};

const Select = styled.select`
	&:hover {
		cursor: pointer;
	}
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
		cursor: pointer;
	}
`;

const Warning = styled.div`
	color: red;
	font-size: 0.7rem;
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

export default Breakdown;
