import { AuthProps } from '../../types/auth';

const Login: React.FC<AuthProps> = ({ setIsLoginComp }) => {
	return (
		<div>
			<div>Login</div>

			<div
				onClick={() => {
					setIsLoginComp(false);
				}}
			>
				회원가입
			</div>
		</div>
	);
};

export default Login;
