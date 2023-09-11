// import { useParams } from 'react-router-dom';

import { useState } from 'react';
import styled from 'styled-components';

// import { color } from '../../assets/styles/theme';

export const UserReservation = () => {
	// const { roomId } = useParams();
	// console.log('객실 아이디 > ' + roomId);

	const houseName = '센텀 제일 가는 호텔';
	const room = {
		id: 1,
		type: '스탠다드',
		price: 32000,
	};
	const reservation = {
		id: 1,
		night: 2,
		price: 64000,
		userNickName: '김도로뇽',
		userPhone: '010-1234-5678',
	};
	const coupons = ['9월달 행사', '대체공휴일 맞이'];
	const totalPoint = 35;
	interface visitor {
		name: string;
		phone: string;
	}
	const [visitor, setVisitor] = useState<visitor>({
		name: '',
		phone: '',
	});

	// 이용자 정보와 예약자 정보의 일치 여부
	const [isChecked, setIsChecked] = useState(false);

	const [coupon, setCoupon] = useState('');
	const [point, setPoint] = useState(0);

	const handleCheckboxChange = () => {
		if (!isChecked === true) {
			setVisitor({
				...visitor,
				name: reservation.userNickName,
				phone: reservation.userPhone,
			});
		} else {
			setVisitor({
				...visitor,
				name: '',
				phone: '',
			});
		}

		setIsChecked(!isChecked);
	};

	const handleVisitor = (e) => {
		setVisitor({
			...visitor,
			[e.target.name]: e.target.value,
		});
	};

	const useTotalPoint = () => {
		setPoint(totalPoint);
	};

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	console.log('이용자 이름 > ' + visitor?.name);
	console.log('이용자 전번 > ' + visitor?.phone);
	console.log('선택된 쿠폰 > ' + coupon);
	console.log('적용할 포인트 > ' + point);
	return (
		<Wrapper>
			<div>
				<Title>{houseName}</Title>
				<div>{room.type}</div>
				<div> 예약 가능 날짜 및 시간 (feat. 달력)</div>
				<div>
					<div>{reservation.night}박</div>
					<div>{reservation.price}원</div>
				</div>
				{/* <Hr /> */}
			</div>
			<div>
				<Title>예약자 정보</Title>
				<div>{reservation.userNickName} /전번은 안 띄워주나?</div>
				{/* <Hr /> */}
			</div>
			<div>
				<Title>이용자 정보</Title>
				<div>
					<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
					예약자 정보와 동일합니다.
				</div>
				<div>
					<div>이용자 명</div>
					<input name="name" value={visitor.name} onChange={handleVisitor} />
				</div>
				<div>
					<div>전화번호</div>
					<input name="phone" value={visitor.phone} onChange={handleVisitor} />
				</div>
				{/* <Hr /> */}
			</div>
			<div>
				<Title>할인</Title>
				<div>쿠폰</div>
				<select value={coupon} onChange={(e) => setCoupon(e.target.value)}>
					<option value={''}>사용 안 함</option>
					{coupons.map((couponOption, idx) => (
						<option key={idx} value={couponOption}>
							{couponOption}
						</option>
					))}
				</select>
				<div>포인트</div>
				<div>
					<input name="point" value={point} onChange={(e) => setPoint(Number(e.target.value))} />
					<button onClick={useTotalPoint}>전액 사용</button> 사용 가능한 포인트 {totalPoint}
				</div>

				{/* <Hr /> */}
			</div>
			<div>
				<div>
					환불 수수료 규정
					<MoreInfo onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</MoreInfo>
				</div>
				{isDropdownOpen && (
					<DropdownContent>
						<p>취소 수수료</p>
						<p>예약일 1달 전 : 100% 환불</p>
						<p>예약일 1달~ 1주 전 : 50% 환불</p>
						<p>예약일 1주 미만 : 0% 환불</p>
					</DropdownContent>
				)}
			</div>
			{/* <Hr /> */}
			<div>
				<Title>결제 금액</Title>
				<div>상품 금액</div>
				<div>할인 금액</div>
				<div>포인트</div>
				<div>총 결제 금액</div>
				{/* <Hr /> */}
			</div>
			<div>결제</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 2rem 5rem;
	display: grid;
	grid-gap: 2rem;
	/* justify-content: left; */
`;
const Title = styled.div`
	margin: 1rem;
	font-size: 1rem;
	font-weight: bold;
`;

// const Hr = styled.hr`
// 	border: solid 5px ${color.color3};
// 	width: 100%;
// `;

const MoreInfo = styled.button`
	background-color: white;
	border-width: 0;
`;

const DropdownContent = styled.div`
	/* position: absolute; */
`;
