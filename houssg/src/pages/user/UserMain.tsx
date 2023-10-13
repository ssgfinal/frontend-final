import { styled } from 'styled-components';

import BannerSlider from '../../components/usermain/BannerSlider';
import HomeSlider from '../../components/usermain/HomeSlider';
import { color } from '../../assets/styles/theme';
import { useKakaoLogin } from '../../hooks/useKaKaoLogin';
import { useEffect, useState } from 'react';

//import { accomodation } from '../../assets/icons';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';
import { HouseBaseInfo } from '../../types';

const UserMain = () => {
	useKakaoLogin();
	const [ratingOrder20, setRatingOrder20] = useState<HouseBaseInfo[]>([]);
	const [registrationOrder20, setRegisterationOrder20] = useState<HouseBaseInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		api.get(userUrl.ratingOrder).then(({ data }) => {
			setRatingOrder20(data);
		});

		api.get(userUrl.registrationOrder).then(({ data }) => {
			setRegisterationOrder20(data);
		});

		setIsLoading(true);
	}, []);

	return (
		<div>
			<BannerSlider />
			<br />
			<UserMainContainer>
				<p>⭐&nbsp;평점 높은 숙소 TOP20</p>
			</UserMainContainer>
			<br />
			{isLoading && <HomeSlider houseList={ratingOrder20} />}

			<UserMainContainer>
				<p>✨&nbsp;최근 등록 숙소 TOP20</p>
			</UserMainContainer>
			<br />
			{isLoading && <HomeSlider houseList={registrationOrder20} />}
		</div>
	);
};

export default UserMain;

const UserMainContainer = styled.div`
	margin-top: 1rem;
	margin-left: 1rem;
	color: ${color.color1};
	text-align: left;
	font-size: 1.3rem;
	font-weight: bold;

	@media (max-width: 400px) {
		font-size: 1rem;
	}
`;
