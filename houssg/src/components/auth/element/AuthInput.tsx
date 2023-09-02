import { styled } from 'styled-components';
import { useEffect, ChangeEvent, useState, memo } from 'react';

import { color } from '../../../assets/styles';
import { unvisible, visible } from '../../../assets/icons';
import { useDebounce } from '../../../hooks';
import { AuthInputType } from '../../../types/auth';
import { Tooltip } from 'antd';

const AuthInput: React.FC<AuthInputType> = ({ title, password, setValue, reg }) => {
	const [isVisible, setIsVisible] = useState(password);
	const [inputValue, setInputValue] = useState('');
	const [isUsable, setIsUsable] = useState(true); // 처음엔 툴팁 안보이도록 true로 설정
	const toggleIsPassword = () => {
		setIsVisible(!isVisible);
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const debouncedValue = useDebounce(inputValue, 200);
	useEffect(() => {
		if (debouncedValue) {
			if (reg) {
				reg.reg.test(debouncedValue) ? setIsUsable(true) : setIsUsable(false);
			}
			setValue(debouncedValue);
		}
	}, [debouncedValue, setValue, reg]);

	return (
		<AuthInputWrapper>
			<AuthInputTitle>{title}</AuthInputTitle>
			<AuthInputContainer>
				{reg ? (
					<Tooltip open={!isUsable} title={reg.tooltip} color={color.color4} placement="topRight" overlayStyle={{ fontSize: '0.7rem', opacity: 0.9 }}>
						<AuthInputSheet type={isVisible ? 'password' : 'text'} onChange={onChangeInput} />
					</Tooltip>
				) : (
					<AuthInputSheet type={isVisible ? 'password' : 'text'} onChange={onChangeInput} />
				)}

				{password && (
					<AuthPasswordVisibility onClick={toggleIsPassword}>
						{!isVisible ? <VisibilityImg src={visible} /> : <VisibilityImg src={unvisible} />}
					</AuthPasswordVisibility>
				)}
			</AuthInputContainer>
		</AuthInputWrapper>
	);
};

export const MemorizedAuthInput = memo(AuthInput);

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

const VisibilityImg = styled.img`
	height: 1.12rem;
	cursor: pointer;
`;
