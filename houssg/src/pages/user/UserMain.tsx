import { styled } from 'styled-components';

import BannerSlider from '../../components/BannerSlider';
import HomeSlider from '../../components/HomeSlider';
import { color } from '../../assets/styles/theme';
import { useKakaoLogin } from '../../hooks/useKaKaoLogin';

const UserMain = () => {
	useKakaoLogin();

	return (
		<div>
			<BannerSlider />
			<br />
			<UserMainContainer>
				<p>&nbsp;평점 높은 숙소 TOP20</p>
			</UserMainContainer>
			<br />
			<HomeSlider />
			<br />
			<UserMainContainer>
				<p>&nbsp;최근 등록&리뷰 많은 숙소 TOP20</p>
			</UserMainContainer>
			<br />
			<HomeSlider />
		</div>
	);
};

export default UserMain;

const UserMainContainer = styled.div`
	margin-top: 1rem;
	margin-left: 1rem;
	color: ${color.color1};
	text-align: left;
	font-size: 1rem;
`;
