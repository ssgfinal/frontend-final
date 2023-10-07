import { styled } from 'styled-components';

import MyPage from '../../components/usermypages/MyPage';
import { useAppSelector } from '../../hooks';
import { isLoginState } from '../../store/redux/authSlice';
import { color } from '../../assets/styles';

const UserMypage = () => {
	const isLogin = useAppSelector(isLoginState);
	return <MyPageWrapper>{isLogin ? <MyPage /> : <PleaseBox>⚠&nbsp;로그인이 필요합니다.&nbsp;⚠</PleaseBox>}</MyPageWrapper>;
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

const PleaseBox = styled.div`
	margin: 10rem;
	color: ${color.color1};
	font-size: 2rem;
	font-weight: bold;
`;
