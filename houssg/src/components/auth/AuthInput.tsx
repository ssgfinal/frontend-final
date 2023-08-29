import { styled } from 'styled-components';
import { useState } from 'react';
import { color } from '../../assets/styles';
interface AuthInputType {
	title: string;
	password?: boolean;
}

const AuthInput: React.FC<AuthInputType> = ({ title, password }) => {
	const [isVisible, setIsVisible] = useState(password);
	const toggleIsPassword = () => {
		setIsVisible(!isVisible);
	};

	return (
		<AuthInputWrapper>
			<AuthInputTitle>{title}</AuthInputTitle>
			<AuthInputContainer>
				<AuthInputSheet type={isVisible ? 'password' : 'text'} />
				{password && <AuthPasswordVisibility onClick={toggleIsPassword}>스티커</AuthPasswordVisibility>}
			</AuthInputContainer>
		</AuthInputWrapper>
	);
};

export default AuthInput;

const AuthInputWrapper = styled.div`
	width: 100%;
	padding-inline: 0.5rem;
	padding-bottom: 0.5rem;
`;
const AuthInputTitle = styled.div`
	font-size: 1rem;
	font-weight: 700;
	margin-bottom: 0.3rem;
`;
const AuthInputContainer = styled.div`
	width: 100%;
	position: relative;
`;
const AuthPasswordVisibility = styled.div`
	position: absolute;
	right: 0.2rem;
	top: 50%;
	transform: translateY(-50%);
`;
const AuthInputSheet = styled.input`
	width: 100%;
	font-size: 0.9rem;
	border: 1px solid ${color.basicColor};
	border-radius: 5px;
	height: 2rem;
	padding-left: 0.3rem;
`;
