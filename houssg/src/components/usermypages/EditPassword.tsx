import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../store/redux/modalSlice';
import { color } from '../../assets/styles';
import { regSignUp } from '../../assets/constant';
import { unvisible, visible } from '../../assets/icons';

// TODO: 서버 > 새 비밀번호
import api from '../../api/api';
import { userUrl } from '../../assets/constant/urlConst';

const EditPassword = (props: { userPassword: string }) => {
	//TODO: 현재 비밀번호를 프론트에서 체크하는지?
	const currentPassword: string = props.userPassword;
	console.log(props.userPassword);

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
				// console.log(newArray);
				return newArray;
			});
		};
	};
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValuePassword = e.target.value;
		setPassword(inputValuePassword);
	};

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueNewPassword = e.target.value;
		setNewPassword(inputValueNewPassword);
	};

	const handleNewPasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValueNewPasswordCheck = e.target.value;
		setNewPasswordCheck(inputValueNewPasswordCheck);
	};

	useEffect(() => {
		if (password !== currentPassword) {
			setIsValidPassword(false);
			setErrorMessage('현재 비밀번호를 입력해 주세요.');
			return;
		}

		if (newPassword === password && newPassword) {
			setIsValidPassword(false);
			setErrorMessage('비밀번호가 같습니다.');
			return;
		}

		if (newPasswordCheck === '') {
			setErrorMessage('');
		} else {
			const isValidNewPassword = regSignUp.regPw.reg.test(newPassword) && newPassword !== password;

			if (isValidNewPassword) {
				setErrorMessage('');
			} else {
				setIsValidPassword(false);
				setErrorMessage('비밀번호를 잘못 입력하셨습니다.');
			}

			const isValidPassword = newPassword === newPasswordCheck;

			if (isValidPassword) {
				setIsValidPassword(isValidPassword);
				setErrorMessage('');
			} else if (newPasswordCheck !== newPassword) {
				setIsValidPassword(false);
				setErrorMessage('비밀번호가 일치하지 않습니다.');
			}
		}
	}, [currentPassword, isValidPassword, newPassword, newPasswordCheck, password]);

	const onEditPass = async () => {
		if (isValidPassword) {
			// TODO: 서버에 전달, 추후 수정 >> payload : 닉네임, 새로운 비밀번호?
			try {
				const userNickName = sessionStorage.getItem('nickname');
				await api.post(userUrl.updateMyPw, { userNickName, newPassword });
				setIsVisibleArray([false, false, false]);
				setPassword('');
				setNewPassword('');
				setNewPasswordCheck('');
				setIsValidPassword(false);
				setErrorMessage('');
				dispatch(closeModal());
			} catch (error) {
				alert('실패하였습니다.');
				console.error(error);
			}
		}
	};

	const cannotEdit = {
		border: !isValidPassword ? color.darkGrayColor : color.color1,
		color: !isValidPassword ? color.darkGrayColor : color.backColor,
		backgroundColor: !isValidPassword ? color.unSelectColor : color.color1,
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

			<EditPasswordButton type="button" onClick={onEditPass} disabled={!isValidPassword} style={cannotEdit}>
				{isValidPassword ? '수정완료' : '수정불가'}
			</EditPasswordButton>
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
	font-size: 1.1rem;
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

	@media (min-width: 900px) {
		img {
			margin: 0 1vw 1.2vw 0;
		}
	}

	@media (max-width: 900px) {
		img {
			margin: 0 1vw 1.5vw 0;
		}
	}

	@media (max-width: 430px) {
		img {
			margin: 0 1vw 2vw 0;
		}
	}

	@media (max-width: 320px) {
		img {
			margin: 0 1vw 2vw 0;
		}
	}
`;

const ErrorMessage = styled.div`
	color: ${color.red};
	font-size: 0.5rem;
	margin: 0.5rem 0 0.5rem 0;
`;

const PasswordInstruction = styled.div`
	color: ${color.darkGrayColor};
	font-size: 0.5rem;
`;

const EditPasswordButton = styled.button`
	border: 1px solid;
	border-radius: 1rem;
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
