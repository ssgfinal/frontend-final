import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { AuthSubmitType } from '../../../types/auth';

const AuthSubmitBtn: React.FC<AuthSubmitType> = ({ children, onClick, disabled, pending }) => {
	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!pending && !disabled && onClick) {
			onClick(event);
		}
	};
	return (
		<SubmitBtnContainer>
			<HoverableText onClick={handleClick} $disabled={disabled} $pending={pending}>
				{children}
			</HoverableText>
		</SubmitBtnContainer>
	);
};

export default AuthSubmitBtn;

const SubmitBtnContainer = styled.div`
	width: 60%;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.3rem 0;

	@media screen and (max-width: 600px) {
		width: 60%;
	}
`;

const HoverableText = styled.span<{ $disabled?: boolean; $pending?: boolean }>`
	color: ${color.color2};
	font-size: 1rem;
	font-weight: 700;
	transition: font-size 0.2s;
	cursor: pointer;
	cursor: ${(props) => props.$disabled && 'not-allowed'};
	cursor: ${(props) => props.$pending && 'wait'};

	&:hover {
		font-size: 1.2rem;
	}
`;
