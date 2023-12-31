import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import BriefHouse from '../house/BriefHouse';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { color } from '../../assets/styles';
import { HouseBaseInfo } from '../../types';

interface HomeSliderProps {
	houseList: HouseBaseInfo[];
}

const HomeSlider: React.FC<HomeSliderProps> = ({ houseList }) => {
	return (
		<HomeSliderWrapper>
			<Swiper
				slidesPerView={1}
				slidesPerGroup={1}
				breakpoints={{
					380: {
						slidesPerView: 1,
					},
					540: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				navigation={true}
				modules={[Navigation]}
				className="homeSwiper"
			>
				{houseList.map((item, index) => (
					<SwiperSlide key={index}>
						<BriefHouse house={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</HomeSliderWrapper>
	);
};

export default HomeSlider;

// TODO: 해당 숙소 상세페이지로 이동할 때, 한 번 더 확인
const HomeSliderWrapper = styled.div`
	width: 100%;

	.homeSwiper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.swiper-wrapper {
		margin: 0.5rem;
	}

	.swiper-button-disabled {
		display: none;
	}

	.swiper-button-prev {
		width: 20px;
		cursor: pointer;
		color: ${color.color1};
		top: var(--swiper-navigation-sides-offset, 38%);
		left: var(--swiper-navigation-sides-offset, 5px);
	}

	.swiper-button-next {
		width: 20px;
		cursor: pointer;
		color: ${color.color1};
		top: var(--swiper-navigation-sides-offset, 38%);
		right: var(--swiper-navigation-sides-offset, 5px);
	}
`;
