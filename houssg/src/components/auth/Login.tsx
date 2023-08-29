import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle } from '../../assets/styles';
import { AuthInput } from '.';
const Login: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<AuthContainer>
			<AuthTitle>로그인</AuthTitle>
			<AuthInput title="아이디" />
			<AuthInput title="비밀번호" password />
			<div
				onClick={() => {
					setIsLoginComp(false);
				}}
			>
				회원가입버튼
			</div>
		</AuthContainer>
	);
};

export default Login;
