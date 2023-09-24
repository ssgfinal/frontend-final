import styled from 'styled-components';
import { color } from '../../../assets/styles';
import { AuthSubmitType } from '../../../types/auth';

const AuthSubmitBtn: React.FC<AuthSubmitType> = ({ children, onClick }) => {
	return (
		<SubmitBtnContainer>
			<HoverableText onClick={onClick}>{children}</HoverableText>
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

const HoverableText = styled.span`
	color: ${color.color2};
	font-size: 1rem;
	font-weight: 700;
	transition: font-size 0.2s;
	cursor: pointer;

	&:hover {
		font-size: 1.2rem;
	}
`;
