import { styled } from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';

import { color } from '../../../assets/styles';
import { unvisible, visible } from '../../../assets/icons';
import { useDebounce } from '../../../hooks';

interface AuthInputType {
	title: string;
	password?: boolean;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const AuthInput: React.FC<AuthInputType> = ({ title, password, setValue }) => {
	const [isVisible, setIsVisible] = useState(password);
	// TODO: 콜백안이라 사용 안됨
	// const [inputValue, setInputValue] = useState('');
	// useEffect(() => {
	// 	setValue(useDebounce(inputValue, 0.2));
	// }, [inputValue]);
	const toggleIsPassword = () => {
		setIsVisible(!isVisible);
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		// const lastValue = useDebounce(e.target.value, 0.2);
		// setValue(lastValue);
		// console.log(e.target.value);
		// setInputValue(e.target.value);
		setValue(e.target.value);
	};

	return (
		<AuthInputWrapper>
			<AuthInputTitle>{title}</AuthInputTitle>
			<AuthInputContainer>
				<AuthInputSheet type={isVisible ? 'password' : 'text'} onChange={onChangeInput} />
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
