import { AuthProps } from '../../types/auth';
import { AuthContainer, AuthTitle } from '../../assets/styles';

const SignUp: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<AuthContainer>
			<AuthTitle>회원가입</AuthTitle>
			<div
				onClick={() => {
					setIsLoginComp(true);
				}}
			>
				로그인버튼
			</div>
		</AuthContainer>
	);
};

export default SignUp;
