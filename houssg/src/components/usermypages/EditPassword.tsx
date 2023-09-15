import styled from 'styled-components';
import { color } from '../../assets/styles';
import { useState } from 'react';
import { regSignUp } from '../../assets/constant';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { unvisible, visible } from '../../assets/icons';

const EditPassword = () => {
	const dispatch = useAppDispatch();

	const [isVisible, setIsVisible] = useState(false);
	const [newpassword, setNewPassword] = useState('');

	const isVisiblePass = () => {
		setIsVisible(!isVisible);
	};

	// 입력값이 유효한지 여부를 나타내는 상태 추가
	const [isValidPassword, setIsValidPassword] = useState(false);

	// 입력값이 변경될 때마다 검사하고 상태 업데이트
	const handlePasswordChange = (e) => {
		const inputValue = e.target.value;
		setNewPassword(inputValue);

		// 입력값을 정규 표현식과 비교하여 유효성을 판단
		const isValid = regSignUp.regPw.reg.test(inputValue);
		setIsValidPassword(isValid);
	};

	const onEditPass = () => {
		dispatch(closeModal());
	};

	return (
		<EditPasswordWrapper>
			<EditPasswordTitle>현재 비밀번호</EditPasswordTitle>
			{<EditPasswordInput type="password"></EditPasswordInput> && (
				<VisibleImage onClick={isVisiblePass}>{!isVisible ? <img src={visible} /> : <img src={unvisible} />}</VisibleImage>
			)}
			<EditPasswordTitle>새 비밀번호</EditPasswordTitle>
			<EditPasswordInput type="password" value={newpassword} onChange={handlePasswordChange} />
			<VisibleImage onClick={isVisiblePass}>{!isVisible ? <img src={visible} /> : <img src={unvisible} />}</VisibleImage>
			<EditPasswordTitle>새 비밀번호 확인</EditPasswordTitle>
			<EditPasswordInput type="password" value={newpassword} onChange={handlePasswordChange} />
			<VisibleImage onClick={isVisiblePass}>{!isVisible ? <img src={visible} /> : <img src={unvisible} />}</VisibleImage>
			<PasswordInstruction>{regSignUp.regPw.tooltip}</PasswordInstruction>
			{isValidPassword ? <EditPasswordButton onClick={onEditPass}>수정완료</EditPasswordButton> : <EditPasswordButton>수정불가</EditPasswordButton>}
		</EditPasswordWrapper>
	);
};

export default EditPassword;

const EditPasswordWrapper = styled.div`
	margin: 5vw 0 1vw 0;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 3vw;
`;

const EditPasswordTitle = styled.div`
	color: ${color.color1};
	font-weight: bold;
`;

const EditPasswordInput = styled.input`
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	font-size: 1rem;
	text-align: center;
	display: grid;
	grid-template-columns: 5fr 1fr;
	z-index: 1;
`;

const VisibleImage = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;

	img {
		width: 4vw;
		position: absolute;
		z-index: 2;
	}
`;

const PasswordInstruction = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	color: ${color.darkGrayColor};
	font-size: 0.5rem;
`;

const EditPasswordButton = styled.button`
	grid-column-start: 1;
	grid-column-end: 3;
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
