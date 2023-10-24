import styled from 'styled-components';
import { color } from '../assets/styles/theme';

const Footer = () => {
	return (
		<FooterWrapper>
			<br /> <br />
			<br />
			<small>Copyright &copy;houssg</small>
		</FooterWrapper>
	);
};

export default Footer;

const FooterWrapper = styled.footer`
	position: absolute;
	width: 100%;
	height: 110px; /* 내용물에 따라 알맞는 값 설정 */
	bottom: 0px;
	padding: 0.5rem;
	background-color: ${color.color1};
	color: ${color.backColor};
`;
