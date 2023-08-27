import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Main = () => {
	const navigate = useNavigate();

	return (
		<MainContainer>
			<div
				onClick={() => {
					navigate('/user');
				}}
			>
				일반 유저
			</div>
			<div
				onClick={() => {
					navigate('/owner');
				}}
			>
				사업자
			</div>
		</MainContainer>
	);
};

export default Main;

const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 95vh;
	gap: 5vw;
`;
