import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { EditIcon } from '../../assets/icons';

interface MyInformations {
	informations: {
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
					<TitleContainer>닉네임</TitleContainer>
					<InputContainer>
						<div>{informationsItem.userNickName}</div>
					</InputContainer>
					<EditIconContainer
						src={EditIcon}
						onClick={() => {
							modalOpen('editNickName', null);
						}}
					></EditIconContainer>
					<TitleContainer>전화번호</TitleContainer>
					<InputContainer>
						<div>{informationsItem.userPhoneNumber}</div>
					</InputContainer>
					<EditIconContainer
						src={EditIcon}
						onClick={() => {
							modalOpen('editPhoneNumber', null);
						}}
					></EditIconContainer>
					<TitleContainer>비밀번호</TitleContainer>
					<div></div>
					<EditIconContainer
						src={EditIcon}
						onClick={() => {
							modalOpen('editPassword', null);
						}}
					></EditIconContainer>
					<Withdrawal
						onClick={() => {
							modalOpen('withdrawal', null);
						}}
					>
						회원탈퇴 &gt;
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
	grid-template-columns: 1fr 1fr 1fr;
	margin: 3vw 7vw;
`;

const TitleContainer = styled.div`
	color: ${color.color1};
	justify-self: left;
	align-self: center;
	font-weight: bold;
	margin-bottom: 3rem;
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
	color: ${color.darkGrayColor};
	justify-self: left;
	align-self: center;
	margin-bottom: 3rem;
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

const EditIconContainer = styled.img`
	cursor: pointer;
	justify-self: right;
	width: 1.3rem;
	margin-bottom: 3rem;
	@media (max-width: 900px) {
		width: 1.2rem;
	}

	@media (max-width: 650px) {
		width: 1.1rem;
	}

	@media (max-width: 530px) {
		width: 1rem;
	}
`;

const Withdrawal = styled.button`
	justify-self: left;
	cursor: pointer;
	padding-left: 0px;
	padding-right: 0px;
	outline: none;
	border: none;
	background-color: transparent;
	resize: none;
	color: ${color.darkGrayColor};
	font-size: 0.8rem;

	@media (max-width: 900px) {
		font-size: 0.7rem;
	}

	@media (max-width: 650px) {
		font-size: 0.5rem;
	}
`;
