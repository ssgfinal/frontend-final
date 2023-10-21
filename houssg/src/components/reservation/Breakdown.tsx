import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { useLocation } from 'react-router-dom';
import { CouponType, SelectedReservationType } from '../../types';

interface BreakdownProps {
	initCouponList: CouponType[];
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}

const arePropsEqual = (prevProps: BreakdownProps, nextProps: BreakdownProps) => {
	// console.log('prevProps >> ', prevProps.selectedReservation.night);
	// console.log('nextProps >> ', nextProps.selectedReservation.night);
	// console.log('True or false >> ', prevProps.selectedReservation.night === nextProps.selectedReservation.night);
	// if (isNaN(prevProps.selectedReservation.night) === true && isNaN(nextProps.selectedReservation.night) === true) {
	// 	return true;
	// }
	// if (nextProps.selectedReservation.night === 0) {
	// 	return true;
	// }
	return (
		prevProps.selectedReservation.night === nextProps.selectedReservation.night
		//  && prevProps.selectedReservation.usingCoupon === nextProps.selectedReservation.usingCoupon
	);

	// prevProps.initCouponList === nextProps.initCouponList &&
};

const Breakdown: React.FC<BreakdownProps> = React.memo(({ initCouponList, selectedReservation, setSelectedReservation }) => {
	console.log('Breakdown 컴포넌트 실행');
	console.log('night >> ', selectedReservation.night);

	const location = useLocation();
	const room = location.state.room;

	const totalPoint = Number(sessionStorage.getItem('point'));

	useEffect(() => {
		setSelectedReservation({
			...selectedReservation,
			paymentPrice: selectedReservation.night * room.roomPrice,
		});
	}, []);

	const [pointStatus, setPointStatus] = useState('num');

	const handleCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedReservation({
			...selectedReservation,
			usingCoupon: initCouponList[Number(e.target.value)],
		});
	};

	const handlePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isNaN(Number(e.target.value))) {
			console.log('포인트에 글자 입력');
			setPointStatus('text');
			setSelectedReservation({
				...selectedReservation,
				usingPoint: 0,
			});
		} else {
			if (Number(e.target.value) > totalPoint) {
				setPointStatus('higher');
				useTotalPoint;
			} else {
				setPointStatus('num');
				setSelectedReservation({
					...selectedReservation,
					usingPoint: Number(e.target.value),
				});
			}
		}
	};

	const useTotalPoint = () => {
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
					<Select onChange={(e) => handleCoupon(e)}>
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
}, arePropsEqual);

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
		cursor: pointer;
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

export default Breakdown;
