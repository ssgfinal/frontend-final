import { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

export const Provision = () => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'provision', modalSize: modalSize }));
	};

	const refundPolicy = '취소 수수료 \n예약일 1달 전 : 100% 환불\n예약일 1달~ 1주 전 : 50% 환불\n예약일 1주 미만 : 취소 및 환불 불가';

	const [isAgreed, setIsAgreed] = useState(false);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// 약관 체크 박스 핸들러 함수
	const handleAgreeCheckbox = () => {
		setIsAgreed(!isAgreed);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<ReservationCommonBox>
			<UserReservationTitle>약관 및 규정</UserReservationTitle>
			<UserReservationLeft>
				<Agree>
					<OneLine>
						<input type="checkbox" checked={isAgreed} onChange={handleAgreeCheckbox} />
						<p> 개인 정보 제공 동의 </p>
					</OneLine>
					<Right onClick={modalOpen}>더 보기 &gt;</Right>
				</Agree>
			</UserReservationLeft>
			<UserReservationLeft>
				환불 수수료 규정
				<MoreInfo onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</MoreInfo>
			</UserReservationLeft>
			{isDropdownOpen && <DropdownContent>{refundPolicy}</DropdownContent>}
		</ReservationCommonBox>
	);
};

const Agree = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const OneLine = styled(UserReservationLeft)`
	display: flex;
`;

const Right = styled.div`
	align-self: center;
	text-align: right;
	color: ${color.darkGrayColor};

	&:hover {
		cursor: pointer;
	}
`;

const MoreInfo = styled.button`
	background-color: white;
	border-width: 0;

	&:hover {
		cursor: pointer;
	}
`;

const DropdownContent = styled.div`
	/* position: absolute; */
	background-color: ${color.unSelectColor};
	border-radius: 1rem;
	padding: 1rem;
	white-space: pre-wrap;
	text-align: left;
	line-height: 1.5rem;
`;
