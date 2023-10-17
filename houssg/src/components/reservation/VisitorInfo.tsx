import { useState } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { SelectedReservationType } from '../../types';

interface VisitorInfoProps {
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}

export const VisitorInfo: React.FC<VisitorInfoProps> = ({ selectedReservation, setSelectedReservation }) => {
	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');

	// 이용자 정보와 예약자 정보의 일치 여부
	const [isChecked, setIsChecked] = useState(false);

	// 이용자와 예약자 일치 체크 박스 핸들러 함수
	const handleCheckboxChange = () => {
		if (!isChecked === true) {
			userNickName &&
				userPhone &&
				setSelectedReservation({
					...selectedReservation,
					visitorName: userNickName,
					visitorPhone: userPhone,
				});
		} else {
			userNickName &&
				userPhone &&
				setSelectedReservation({
					...selectedReservation,
					visitorName: '',
					visitorPhone: '',
				});
		}

		setIsChecked(!isChecked);
	};

	// 이용자 입력 핸들러
	const handleVisitor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedReservation({
			...selectedReservation,
			[e.target.name]: e.target.value,
		});
		if (isChecked == true) {
			setIsChecked(false);
		}
	};

	return (
		<ReservationCommonBox>
			<UserReservationTitle>이용자 정보</UserReservationTitle>
			<UserReservationLeft>
				<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
				&nbsp; 예약자 정보와 동일합니다.
			</UserReservationLeft>
			<UserReservationLeft>이용자 명</UserReservationLeft>
			<Input name="visitorName" value={selectedReservation.visitorName} onChange={handleVisitor} />
			<UserReservationLeft>전화번호</UserReservationLeft>
			<Input type="number" name="visitorPhone" value={selectedReservation.visitorPhone} onChange={handleVisitor} placeholder="- 없이 작성해주세요" />
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
