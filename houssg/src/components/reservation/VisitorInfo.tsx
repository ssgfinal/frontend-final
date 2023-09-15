import { useState } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const VisitorInfo = () => {
	const reservation = {
		id: 1,
		night: 2,
		price: 64000,
		userNickName: '김도로뇽',
		userPhone: '01012345678',
	};

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

	// 이용자와 예약자 일치 체크 박스 핸들러 함수
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

	// 이용자 입력 핸들러
	const handleVisitor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVisitor({
			...visitor,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<ReservationCommonBox>
			<UserReservationTitle>이용자 정보</UserReservationTitle>
			<UserReservationLeft>
				<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
				&nbsp; 예약자 정보와 동일합니다.
			</UserReservationLeft>
			<UserReservationLeft>이용자 명</UserReservationLeft>
			<Input name="name" value={visitor.name} onChange={handleVisitor} />
			<UserReservationLeft>전화번호</UserReservationLeft>
			<Input type="number" name="phone" value={visitor.phone} onChange={handleVisitor} placeholder="- 없이 작성해주세요" />
		</ReservationCommonBox>
	);
};

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
