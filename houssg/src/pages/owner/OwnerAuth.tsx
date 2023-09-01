import styled from 'styled-components';
import { AuthWrap } from '../../components/auth';
import { color } from '../../assets/styles';
import { useNavigate } from 'react-router-dom';

const OwnerAuth = () => {
	const navigate = useNavigate();

	return (
		<div>
			<div onClick={() => navigate('/')} style={{ backgroundColor: color.color4, height: '40px' }}>
				시작점 가는 버튼
			</div>
			<OwnerAuthWrapper>
				<OwnerAuthContainer>
					<AuthWrap />
				</OwnerAuthContainer>
			</OwnerAuthWrapper>
		</div>
	);
};

export default OwnerAuth;

const OwnerAuthWrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	max-width: 500px;
	min-width: 500px;
`;

const OwnerAuthContainer = styled.div`
	width: 100%;
	border: 0.3rem solid ${color.color3};
	border-radius: 1.5rem;
	padding: 20px 24px;
	position: relative;
`;
