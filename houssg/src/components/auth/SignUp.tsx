import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle, color } from '../../assets/styles';
import { AuthInput, AuthModeBtn, AuthSubmitBtn } from './element';
import { styled } from 'styled-components';
import { usePathname } from '../../hooks';

const SignUp: React.FC<AuthProps> = ({ isLoginComp, setIsLoginComp }) => {
	const pathname = usePathname();
	const isUser = pathname.startsWith('/user');

	return (
		<AuthContainer>
			<AuthTitle>회원가입</AuthTitle>
			<CheckerContainer>
				<AuthInput title="아이디" />
				<UseAbilitiyChecker $isUser={isUser}>본인 확인</UseAbilitiyChecker>
			</CheckerContainer>
			<CheckerContainer>
				<AuthInput title="닉네임" />
				<UseAbilitiyChecker $isUser={isUser}>중복 확인</UseAbilitiyChecker>
			</CheckerContainer>
			<AuthInput title="비밀번호" password />
			<AuthInput title="비밀번호확인" password />
			<AuthSubmitBtn>회원가입하기</AuthSubmitBtn>

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
