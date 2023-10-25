import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import styled from 'styled-components';

import { color, ReservationCommonBox, UserReservationTitle, UserReservationLeft } from '../../assets/styles';

interface ProvisionProps {
	isAgreed: boolean;
	setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Provision: React.FC<ProvisionProps> = ({ isAgreed, setIsAgreed }) => {
	const dispatch = useAppDispatch();

	const modalOpen = () => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: 'provision', modalSize: modalSize }));
	};

	const refundPolicy =
		'취소 수수료 \n예약일 1주 전 : 100% 환불\n예약일 5일 전 : 70% 환불\n예약일 3일 전 : 50% 환불\n예약일 1일 전 ~ 당일 : 취소 불가';

	// 약관 체크 박스 핸들러 함수
	const handleAgreeCheckbox = () => {
		setIsAgreed(!isAgreed);
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
				<RefundPolicy>{refundPolicy}</RefundPolicy>
			</UserReservationLeft>
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

const RefundPolicy = styled.div`
	margin-top: 1rem;
	border: solid 0.3rem ${color.color5};
	border-radius: 1rem;
	padding: 1rem;
	white-space: pre-wrap;
	text-align: left;
	line-height: 1.5rem;
`;
