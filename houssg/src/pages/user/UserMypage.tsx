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
	display: grid;
	grid-template-columns: 1fr 4fr 1fr;
`;
