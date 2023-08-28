import { styled } from 'styled-components';
import BannerSlider from '../../components/common/BannerSlider';
import HomeSlider from '../../components/common/HomeSlider';

import { color } from '../../assets/styles/theme';
const UserMain = () => {
	return (
		<div>
			<BannerSlider />
			<br />
			<UserMainContainer>
				<p>&nbsp;평점 높은 숙소 TOP20</p>
			</UserMainContainer>
			<br />
			<HomeSlider />
		</div>
	);
};

export default UserMain;

const UserMainContainer = styled.div`
	color: ${color.color1};
	text-align: left;
	font-size: 1rem;
`;
