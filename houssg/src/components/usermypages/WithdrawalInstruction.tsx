import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';

const WithdrawalInstruction = () => {
	const dispatch = useAppDispatch();

	const withdrawalButton = () => {
		dispatch(closeModal());
	};
	return (
		<WithdrawalInstructionWrapper>
			<Title>탈퇴 안내</Title>
			<br />
			<p>
				📌회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요. 사용하고 계신 아이디(💜유저아이디)는 탈퇴할 경우 재사용 및 복구가 불가능합니다. 탈퇴한
			</p>
			<br />
			<p>📌 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
			<hr />
			<p>
				📌탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다. 회원정보 및 예약내역, 후기 등 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는
				복구되지 않습니다.
			</p>
			<hr />
			📌 나의 정보&nbsp; 아이디, 닉네임, 전화번호, 포인트, 쿠폰 등 삭제
			<br /> 예약 내역&nbsp; 예약 및 결제 내역 삭제제(💜삭제하는지???)
			<br /> 나의 후기&nbsp; 게시물 삭제(💜삭제하는지???)
			<br /> 찜한 숙소&nbsp; '좋아요'한 숙소 리스트 삭제
			<br />
			(사업자) 운영 중인 사업장 내 게시물 및 판매 이력 등을 포함한 모든 정보 삭제
			<hr />
			<br /> 📌카카오 연동 아이디의 경우, 로그인 할 수 없게 됩니다.(💜삭제하는지???)
			<hr />
			<br /> 📌탈퇴 후에는 아이디 (💜유저아이디)로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다. 게시판형 서비스에 남아 있는 게시글은
			탈퇴 후 삭제할 수 없습니다.(💜삭제하는지???)
			<hr />
			<br />
			<div>
				<input type="checkbox" />
				<span>안내 사항을 모두 확인하였으며, 이에 동의합니다.</span>
			</div>
			<br />
			<WithdrawalButton onClick={withdrawalButton}>확인</WithdrawalButton>
		</WithdrawalInstructionWrapper>
	);
};

export default WithdrawalInstruction;

const WithdrawalInstructionWrapper = styled.div`
	display: grid;
`;

const Title = styled.div`
	font-size: 1.3rem;
	font-weight: bold;
	color: ${color.color1};
`;

const WithdrawalButton = styled.button`
	border: 1px solid ${color.color1};
	border-radius: 1rem;
	background-color: ${color.color1};
	color: ${color.backColor};
	width: 80px;
	height: 30px;
	margin: 1rem;
	justify-self: center;
	align-self: center;

	&:hover {
		cursor: pointer;
		font-weight: bold;
		border: 1px solid ${color.color3};
		background-color: ${color.color3};
	}
`;
