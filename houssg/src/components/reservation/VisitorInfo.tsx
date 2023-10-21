import { useState } from 'react';

import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';
import { SelectedReservationType } from '../../types';
// import { regSignUp } from '../../assets/constant';

interface VisitorInfoProps {
	selectedReservation: SelectedReservationType;
	setSelectedReservation: React.Dispatch<React.SetStateAction<SelectedReservationType>>;
}

export const VisitorInfo: React.FC<VisitorInfoProps> = ({ selectedReservation, setSelectedReservation }) => {
	const userNickName = sessionStorage.getItem('nickname');
	const userPhone = sessionStorage.getItem('phone');

	// 이용자 정보와 예약자 정보의 일치 여부
	const [isChecked, setIsChecked] = useState(false);

	const [visitorAlarm, setVisitorAlarm] = useState('');

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
		if (isChecked == true) {
			setIsChecked(false);
		}
		const { name, value } = e.target;

		if (name === 'visitorName') {
			setSelectedReservation({
				...selectedReservation,
				[name]: value,
				visitorPhone: '', // 방문자 폰번호 초기화
			});
			return;
		}

		// visitorPhone 입력한 경우
		// if (isNaN(parseInt(value))) { // 문자를 입력한 경우
		if (/[^0-9]/.test(value)) {
			// 문자가 존재한 경우
			setSelectedReservation({
				...selectedReservation,
				visitorName: '',
			});

			setVisitorAlarm('숫자만 입력 가능합니다.');
			return;
		}

		if (!value.match(/^0/)) {
			console.log('전화번호 시작이 0이 아닙니다.');
			setVisitorAlarm('전화번호 시작은 0이어야합니다.');
			return;
		}

		if (value.length <= 11) {
			// 숫자를 입력한 경우
			setSelectedReservation({
				...selectedReservation,
				[name]: value,
				visitorName: '',
			});
			setVisitorAlarm('');
			return;
		}

		setVisitorAlarm('전화번호는 11자리가 최대입니다.');
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
			<Input name="visitorPhone" value={selectedReservation.visitorPhone} onChange={handleVisitor} placeholder="- 없이 작성해주세요" />
			{visitorAlarm && <Alarm>{visitorAlarm}</Alarm>}
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
	/* &[type='number']::-webkit-outer-spin-button,
	&[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	} */
`;

const Alarm = styled.div`
	color: red;
	font-size: 10px;
	text-align: left;
`;
