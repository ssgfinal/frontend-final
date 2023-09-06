import { styled } from 'styled-components';

import MyPage from '../../components/usermypages/MyPage';

const UserMypage = () => {
	return (
		<MyPageWrapper>
			<MyPage />
		</MyPageWrapper>
	);
};

export default UserMypage;

const MyPageWrapper = styled.div`
	width: 100%;
	//background-color: rgba(90, 90, 90, 0.05);
`;
