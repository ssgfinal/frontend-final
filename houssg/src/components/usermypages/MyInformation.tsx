import styled from 'styled-components';
import { color } from '../../assets/styles';
import { EditIcon } from '../../assets/icons';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';

const MyInformation = () => {
	const dispatch = useAppDispatch();

	const modalOpen = (component: string, message: string | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message }));
	};

	return (
		<MyInformationWrapper>
			<TitleContainer>아이디</TitleContainer>
			<InputContainer>
				<div>abc</div>
			</InputContainer>
			<TitleContainer>닉네임</TitleContainer>
			<InputContainer>
				<div>집에가고싶다</div>
			</InputContainer>
			<EditIconContainer>
				<img
					src={EditIcon}
					onClick={() => {
						modalOpen('editNickName', null);
					}}
				/>
			</EditIconContainer>
			<TitleContainer>전화번호</TitleContainer>
			<InputContainer>
				<div>010-1111-2222</div>
				{/* <input type="tel" value="010-1111-2222" readOnly required /> */}
			</InputContainer>
			<EditIconContainer>
				<img
					src={EditIcon}
					onClick={() => {
						modalOpen('editPhoneNumber', null);
					}}
				/>
			</EditIconContainer>
			<TitleContainer>비밀번호</TitleContainer>
			<div></div>
			<EditIconContainer>
				<img
					src={EditIcon}
					onClick={() => {
						modalOpen('editPassword', null);
					}}
				/>
			</EditIconContainer>
			<Withdrawal>
				<button
					onClick={() => {
						modalOpen('instruction', '회원을 탈퇴하시겠습니까?');
					}}
				>
					회원탈퇴 &gt;
				</button>
			</Withdrawal>
		</MyInformationWrapper>
	);
};

export default MyInformation;

const MyInformationWrapper = styled.div`
	margin: 5vw 15vw 5vw 15vw;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;

	@media (max-width: 900px) {
		margin: 3vw 12vw 3vw 12vw;
	}

	@media (max-width: 650px) {
		margin: 3vw 5vw 3vw 5vw;
	}

	@media (max-width: 530px) {
		margin: 3vw 5vw 3vw 5vw;
	}
`;

const TitleContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	margin-bottom: 3rem;
	color: ${color.color1};
	text-align: left;
	font-weight: bold;

	@media (max-width: 900px) {
		font-size: 0.9rem;
	}

	@media (max-width: 650px) {
		font-size: 0.8rem;
	}

	@media (max-width: 530px) {
		font-size: 0.5rem;
	}
`;

const InputContainer = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	color: ${color.darkGrayColor};
	text-align: left;
	@media (max-width: 900px) {
		font-size: 0.9rem;
	}

	@media (max-width: 650px) {
		font-size: 0.8rem;
	}

	@media (max-width: 460px) {
		font-size: 0.5rem;
	}
`;

const EditIconContainer = styled.div`
	cursor: pointer;
	text-align: right;
	img {
		width: 1.3rem;
		@media (max-width: 900px) {
			width: 1.2rem;
		}

		@media (max-width: 650px) {
			width: 1.1rem;
		}

		@media (max-width: 530px) {
			width: 1rem;
		}
	}
`;

const Withdrawal = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	padding-top: 5vw;
	justify-self: left;

	button {
		cursor: pointer;
		padding-left: 0px;
		padding-right: 0px;
		outline: none;
		border: none;
		background-color: transparent;
		resize: none;
		color: ${color.darkGrayColor};
		font-size: 0.8rem;
		text-align: left;
		@media (max-width: 900px) {
			font-size: 0.7rem;
		}

		@media (max-width: 650px) {
			font-size: 0.5rem;
		}

		@media (max-width: 530px) {
			font-size: 0.3rem;
		}
	}
`;
