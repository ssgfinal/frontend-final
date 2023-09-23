import { AuthContainer, AuthTitle, color } from '../../assets/styles';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { styled } from 'styled-components';
import { usePathname } from '../../hooks';
import { useState } from 'react';
import { regSignUp } from '../../assets/constant';
import { authSignUpFunc, idCheckFunc, nickCheckFunc } from '../../utils';
import { AuthProps } from '../../types';

const SignUp: React.FC<AuthProps> = ({ isLoginComp, setIsLoginComp }) => {
	const pathname = usePathname();
	const isUser = pathname.startsWith('/user');

	const [userId, setUserId] = useState('');
	const [userNick, setUserNick] = useState('');
	const [userPw, setUserPw] = useState('');
	const [userPwCheck, setUserPwCheck] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const { regId, regPw, regNick, regPhone } = regSignUp;

	const onSignUp = () => {
		authSignUpFunc(userId, userNick, userPw, userPwCheck, userPhone, setIsLoginComp);
	};

	const onIdCheck = () => {
		idCheckFunc(userId);
	};

	const onNickCheck = () => {
		nickCheckFunc(userNick);
	};
	return (
		<AuthContainer>
			<AuthTitle>회원가입</AuthTitle>
			<CheckerContainer>
				<AuthInput setValue={setUserId} title="아이디" reg={regId} />
				<UseAbilitiyChecker $isUser={isUser} onClick={onIdCheck}>
					본인 확인
				</UseAbilitiyChecker>
			</CheckerContainer>
			<CheckerContainer>
				<AuthInput setValue={setUserNick} title="닉네임" reg={regNick} />
				<UseAbilitiyChecker $isUser={isUser} onClick={onNickCheck}>
					중복 확인
				</UseAbilitiyChecker>
			</CheckerContainer>
			<AuthInput setValue={setUserPw} title="비밀번호" password reg={regPw} />
			<AuthInput setValue={setUserPwCheck} title="비밀번호확인" password />
			<AuthInput setValue={setUserPhone} title="전화번호" reg={regPhone} />

			<AuthSubmitBtn onClick={onSignUp}>회원가입하기</AuthSubmitBtn>

			<AuthModeBtn isLoginComp={isLoginComp} setIsLoginComp={setIsLoginComp}>
				로그인으로
			</AuthModeBtn>
		</AuthContainer>
	);
};

export default SignUp;

const CheckerContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const UseAbilitiyChecker = styled.div<{ $isUser?: boolean }>`
	position: absolute;
	padding: 0.3rem 0.5rem;
	right: calc(12% + 0.2rem);
	bottom: 0;
	/* TODO: */
	transform: translateY(${(props) => (props.$isUser ? '-42.5%' : '-75%')});
	font-size: 0.7rem;
	color: ${color.backColor};
	background-color: ${color.color3};
	border-radius: 3px;
	cursor: pointer;
	opacity: 1;
	height: 1.7rem;

	justify-content: center;
	align-items: center;
`;
