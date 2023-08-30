import styled from 'styled-components';
import { color } from '../../../assets/styles';

interface AuthSubmitType {
	children: string;
}

const AuthSubmitBtn: React.FC<AuthSubmitType> = ({ children }) => {
	return (
		<SubmitBtnContainer>
			<HoverableText>{children}</HoverableText>
		</SubmitBtnContainer>
	);
};

export default AuthSubmitBtn;

const SubmitBtnContainer = styled.div`
	width: 45%;
	height: 2rem;
	color: ${color.color2};
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.3rem 0;
`;

const HoverableText = styled.span`
	font-size: 1rem;
	font-weight: 700;
	transition: font-size 0.2s;
	cursor: pointer;

	&:hover {
		font-size: 1.2rem;
	}
`;
