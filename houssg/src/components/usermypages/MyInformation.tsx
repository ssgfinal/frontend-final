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
				<input type="text" value="abc" readOnly />
			</InputContainer>
			<TitleContainer>닉네임</TitleContainer>
			<InputContainer>
				<input type="text" value="집에가고싶다" readOnly />
			</InputContainer>
			<EditIconContainer>
				<img src={EditIcon} />
			</EditIconContainer>
			<TitleContainer>전화번호</TitleContainer>
			<InputContainer>
				<input type="tel" value="010-1111-2222" readOnly required />
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
			<Withdrawal
				onClick={() => {
					modalOpen('instruction', '회원을 탈퇴하시겠습니까?');
				}}
			>
				회원탈퇴 &gt;
			</Withdrawal>
		</MyInformationWrapper>
	);
};

export default MyInformation;

const MyInformationWrapper = styled.div`
	margin: 5rem 15rem 5rem 15rem;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
`;

const TitleContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	margin-bottom: 3rem;
	color: ${color.color1};
	text-align: left;
	font-weight: bold;
`;

const InputContainer = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
	input {
		color: ${color.darkGrayColor};
		outline: none;
		border: none;
		background-color: transparent;
		resize: none;
	}
`;

const EditIconContainer = styled.div`
	cursor: pointer;
	text-align: right;
	img {
		width: 1.5vw;
	}
`;

const Withdrawal = styled.div`
	cursor: pointer;
	padding-top: 5vw;
	color: ${color.darkGrayColor};
	font-size: 0.8rem;
	text-align: left;
`;
