import { AuthProps } from '../../types/auth';

const SignUp: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<div>
			<div>회원가입</div>
			<div
				onClick={() => {
					setIsLoginComp(true);
				}}
			>
				로그인버튼
			</div>
		</div>
	);
};

export default SignUp;
