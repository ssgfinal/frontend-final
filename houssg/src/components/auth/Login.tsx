import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle, HeightPositioningDiv } from '../../assets/styles';
import { AuthInput } from '.';
import { kakaoLogin } from '../../assets/images';
import AuthSubmitBtn from './element/AuthSubmitBtn';
import AuthModeBtn from './element/AuthModeBtn';
const Login: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<AuthContainer>
			<AuthTitle>로그인</AuthTitle>
			<AuthInput title="아이디" />
			<AuthInput title="비밀번호" password />
			<AuthSubmitBtn>로그인하기</AuthSubmitBtn>
			<HeightPositioningDiv height="0.2rem" />
			<img src={kakaoLogin} width="45%" />
			<HeightPositioningDiv height="1.3rem" />
			<AuthModeBtn setIsLoginComp={setIsLoginComp}>회원가입하기</AuthModeBtn>
		</AuthContainer>
	);
};

export default Login;
