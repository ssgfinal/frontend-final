import { styled } from 'styled-components';

import MyPage from '../../components/usermypages/MyPage';

const UserMypage = () => {
	return (
		<MyPageWrapper>
			<div></div>
			<MyPage />
		</MyPageWrapper>
	);
};

export default UserMypage;

const MyPageWrapper = styled.div`
	width: 100%;

	@media (min-width: 1400px) {
		width: 100%;
	}

	@media (min-width: 1200px) and (max-width: 1400px) {
		width: 100%;
	}

	@media (min-width: 700px) and (max-width: 1200px) {
		width: 100%;
	}

	@media (max-width: 700px) {
		width: 100vw;
	}
`;
