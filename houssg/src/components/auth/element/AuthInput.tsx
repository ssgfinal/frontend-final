import { styled } from 'styled-components';
import { useState } from 'react';

import { color } from '../../../assets/styles';
import { unvisible, visible } from '../../../assets/icons';

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
				{password && (
					<AuthPasswordVisibility onClick={toggleIsPassword}>
						{!isVisible ? <img src={visible} height="20px" /> : <img src={unvisible} height="20px" />}
					</AuthPasswordVisibility>
				)}
			</AuthInputContainer>
		</AuthInputWrapper>
	);
};

export default AuthInput;

const AuthInputWrapper = styled.div`
	width: 80%;
	padding-inline: 0.5rem;
	padding-bottom: 0.5rem;
	height: 4.5rem;
`;
const AuthInputTitle = styled.div`
	font-size: 1rem;
	font-weight: 700;
	margin-bottom: 0.3rem;
	text-align: start;
`;
const AuthInputContainer = styled.div`
	width: 100%;
	position: relative;
`;
const AuthPasswordVisibility = styled.div`
	position: absolute;
	right: 0.3rem;
	top: 50%;
	transform: translateY(-40%);
`;
const AuthInputSheet = styled.input`
	width: 100%;
	font-size: 0.9rem;
	border: 1px solid ${color.basicColor};
	border-radius: 5px;
	height: 2.2rem;
	padding-left: 0.3rem;
`;
