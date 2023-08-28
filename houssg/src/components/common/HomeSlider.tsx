import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Koala from '../../assets/icons/Koala.jpg';
import Jellyfish from '../../assets/icons/Jellyfish.jpg';
import Desert from '../../assets/icons/Desert.jpg';
import Hydrangeas from '../../assets/icons/Hydrangeas.jpg';
import Lighthouse from '../../assets/icons/Lighthouse.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HomeSlider.css';

const HomeSlider = () => {
	return (
		<HomeSliderContainer>
			<Swiper
				slidesPerView={1}
				spaceBetween={5}
				slidesPerGroup={1}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 40,
					},
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				// slideToClickedSlide={true}
				className="homeSwiper"
			>
				<div className="swiper-slide">
					<SwiperSlide>
						<img src={Koala} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Jellyfish} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Desert} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Hydrangeas} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Lighthouse} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Koala} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={Jellyfish} />
					</SwiperSlide>
				</div>
			</Swiper>
		</HomeSliderContainer>
	);
};

export default HomeSlider;

const HomeSliderContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
