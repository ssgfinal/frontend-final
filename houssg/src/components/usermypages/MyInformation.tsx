import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { EditIcon } from '../../assets/icons';

interface MyInformations {
	informations: {
		userId: string;
		userNickName: string;
		userPhoneNumber: string;
		userPassword: number;
	}[];
}

const MyInformation: React.FC<MyInformations> = ({ informations }) => {
	const dispatch = useAppDispatch();

	const modalOpen = (component: string, message: string | null) => {
		const modalSize = window.innerWidth >= 1000 ? 500 : 400;
		dispatch(openModal({ modalComponent: component, modalSize: modalSize, modalText: message }));
	};

	return (
		<MyInformationWrapper>
			{informations.map((informationsItem, index) => (
				<MyInformationContainer key={index}>
					<TitleContainer>아이디</TitleContainer>
					<InputContainer>
						<div>{informationsItem.userId}</div>
					</InputContainer>
					<TitleContainer>닉네임</TitleContainer>
					<InputContainer>
						<div>{informationsItem.userNickName}</div>
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
						<div>{informationsItem.userPhoneNumber}</div>
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
								modalOpen('withdrawal', null);
							}}
						>
							회원탈퇴 &gt;
						</button>
					</Withdrawal>
				</MyInformationContainer>
			))}
		</MyInformationWrapper>
	);
};

export default MyInformation;

const MyInformationWrapper = styled.div`
	width: 100%;
`;

const MyInformationContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;

	@media (min-width: 900px) {
		margin: 1vw 5vw 1vw 5vw;
	}

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
	text-align: right;
	img {
		cursor: pointer;
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
