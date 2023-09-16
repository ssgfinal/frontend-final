import styled from 'styled-components';
import { color } from '../../assets/styles';
import { useState } from 'react';
import { regSignUp } from '../../assets/constant';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { unvisible, visible } from '../../assets/icons';

const EditPassword = () => {
	const dispatch = useAppDispatch();

	const [isVisibleArray, setIsVisibleArray] = useState([false, false, false]);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordCheck, setNewPasswordCheck] = useState('');

	const isVisiblePass = (index: number) => {
		return () => {
			setIsVisibleArray((prevArray) => {
				const newArray = [...prevArray];
				newArray[index] = !newArray[index];
				console.log(newArray);
				return newArray;
			});
		};
	};
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValuePassword = e.target.value;
		setPassword(inputValuePassword);
		const isPassword = regSignUp.regPw.reg.test(inputValuePassword);
		if (isPassword) {
			setErrorMessage('');
		} else {
			setErrorMessage('비밀번호를 잘못 입력하셨습니다.');
		}
	};

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueNewPassword = e.target.value;
		setNewPassword(inputValueNewPassword);
		const isValidNewPassword = regSignUp.regPw.reg.test(inputValueNewPassword) && newPassword !== password;

		if (isValidNewPassword) {
			setErrorMessage('');
		} else if (newPassword === password) {
			setErrorMessage('비밀번호가 같습니다.');
		} else {
			setErrorMessage('비밀번호를 잘못 입력하셨습니다.');
		}
	};

	const handleNewPasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueNewPasswordCheck = e.target.value;
		setNewPasswordCheck(inputValueNewPasswordCheck);
		const isValidPassword = regSignUp.regPw.reg.test(inputValueNewPasswordCheck) && inputValueNewPasswordCheck === newPassword;
		if (isValidPassword) {
			setIsValidPassword(isValidPassword);
			setErrorMessage('');
		} else if (inputValueNewPasswordCheck !== newPassword) {
			setErrorMessage('비밀번호가 일치하지 않습니다.');
		} else {
			setErrorMessage('비밀번호를 잘못 입력하셨습니다.');
		}
	};

	const onEditPass = () => {
		alert(isValidPassword);
		if (isValidPassword) {
			// 서버에 전달
			setPassword('');
			setNewPassword('');
			setNewPasswordCheck('');
			dispatch(closeModal());
		}
	};

	return (
		<EditPasswordWrapper>
			<EditPasswordTitle>현재 비밀번호</EditPasswordTitle>
			<EditPasswordInput
				type={isVisibleArray[0] ? 'text' : 'password'}
				value={password}
				onChange={handlePasswordChange}
				disabled={false}
			></EditPasswordInput>
			<VisibleImage onClick={isVisiblePass(0)}>{!isVisibleArray[0] ? <img src={unvisible} /> : <img src={visible} />}</VisibleImage>
			<EditPasswordTitle>새 비밀번호</EditPasswordTitle>
			<EditPasswordInput type={isVisibleArray[1] ? 'text' : 'password'} value={newPassword} onChange={handleNewPasswordChange} disabled={false} />
			<VisibleImage onClick={isVisiblePass(1)}>{!isVisibleArray[1] ? <img src={unvisible} /> : <img src={visible} />}</VisibleImage>
			<EditPasswordTitle>새 비밀번호 확인</EditPasswordTitle>
			<EditPasswordInput
				type={isVisibleArray[2] ? 'text' : 'password'}
				value={newPasswordCheck}
				onChange={handleNewPasswordCheckChange}
				disabled={false}
			/>
			<VisibleImage onClick={isVisiblePass(2)}>{!isVisibleArray[2] ? <img src={unvisible} /> : <img src={visible} />}</VisibleImage>
			{errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
			<PasswordInstruction>{regSignUp.regPw.tooltip}</PasswordInstruction>

			{isValidPassword ? (
				<EditPasswordButton onClick={onEditPass} disabled={false}>
					수정완료
				</EditPasswordButton>
			) : (
				<EditPasswordButton disabled={true}>수정불가</EditPasswordButton>
			)}
		</EditPasswordWrapper>
	);
};

export default EditPassword;

const EditPasswordWrapper = styled.div`
	margin: 5vw 5vw 3vw 5vw;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const EditPasswordTitle = styled.div`
	margin: 0 0 1vw 0;
	color: ${color.color1};
	font-weight: bold;
`;

const EditPasswordInput = styled.input`
	margin-bottom: 1vw;
	outline: none;
	color: ${color.color1};
	border: 1px solid ${color.unSelectColor};
	border-radius: 1rem;
	font-size: 1.5rem;
	text-align: center;
`;

const VisibleImage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: flex-end;

	img {
		cursor: pointer;
		width: 1.2rem;
		height: 1.2rem;
		position: absolute;
		z-index: 1;
		margin: 0 1vw 1.5vw 0;
	}
`;

const ErrorMessage = styled.div`
	color: red;
	font-size: 0.5rem;
	margin: 0.5rem 0 0.5rem 0;
`;

const PasswordInstruction = styled.div`
	color: ${color.darkGrayColor};
	font-size: 0.5rem;
`;

const EditPasswordButton = styled.button`
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
