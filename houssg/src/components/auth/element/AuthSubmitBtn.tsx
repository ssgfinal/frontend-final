import styled from 'styled-components';
import { color } from '../../../assets/styles';

interface AuthSubmitType {
	children: string;
}

const AuthSubmitBtn: React.FC<AuthSubmitType> = ({ children }) => {
	return <SubmitBtnContainer>{children}</SubmitBtnContainer>;
};

export default AuthSubmitBtn;

const SubmitBtnContainer = styled.div`
	width: 40%;
	height: 2rem;
	font-weight: 700;
	color: ${color.color2};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.3rem 0;
`;
