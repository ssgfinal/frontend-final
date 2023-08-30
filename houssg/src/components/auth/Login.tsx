import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle } from '../../assets/styles';
import { AuthInput } from '.';
import { kakaoLogin } from '../../assets/images';
import AuthSubmitBtn from './element/AuthSubmitBtn';
const Login: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<AuthContainer>
			<AuthTitle>로그인</AuthTitle>
			<AuthInput title="아이디" />
			<AuthInput title="비밀번호" password />
			<AuthSubmitBtn>로그인하기</AuthSubmitBtn>
			<img src={kakaoLogin} width="45%" />
			<div
				onClick={() => {
					setIsLoginComp(false);
				}}
			>
				회원가입하기
			</div>
		</AuthContainer>
	);
};

export default Login;
